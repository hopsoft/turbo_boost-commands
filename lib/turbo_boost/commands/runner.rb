# frozen_string_literal: true

require_relative "sanitizer"

class TurboBoost::Commands::Runner
  attr_reader :controller

  delegate :state, to: :"controller.turbo_boost"

  def initialize(controller)
    @controller = controller
  end

  def meta_tag
    masked_token = message_verifier.generate(new_token)
    options = {
      id: "turbo-boost",
      name: "turbo-boost",
      content: masked_token,
      data: {busy: false, state: state.payload}
    }
    controller.view_context.tag("meta", options).html_safe
  end

  def command_requested?
    command_params.present?
  end

  def command_valid?
    return false unless command_requested?

    # validate class
    unless command_instance.is_a?(TurboBoost::Commands::Command)
      raise TurboBoost::Commands::InvalidClassError,
        "`#{command_class_name}` is not a subclass of `TurboBoost::Commands::Command`!"
    end

    # validate method
    unless command_instance.respond_to?(command_method_name)
      raise TurboBoost::Commands::InvalidMethodError,
        "`#{command_class_name}` does not define the public method `#{command_method_name}`!"
    end

    # validate csrf token
    unless valid_client_token?
      raise TurboBoost::Commands::InvalidTokenError,
        "CSRF token mismatch! The request header `TurboBoost-Token: #{client_token}` does not match the expected value of `#{server_token}`."
    end

    true
  end

  def command_params
    return ActionController::Parameters.new if controller.params[:turbo_boost_command].nil?
    @command_params ||= begin
      payload = parsed_command_params.deep_transform_keys(&:underscore)
      ActionController::Parameters.new(payload).permit!
    end
  end

  def command_name
    return nil unless command_requested?
    command_params[:name]
  end

  def command_class_name
    return nil unless command_requested?
    name = command_name.split("#").first
    name << "Command" unless name.end_with?("Command")
    name
  end

  def command_method_name
    return nil unless command_requested?
    return "perform" unless command_name.include?("#")
    command_name.split("#").last
  end

  def command_class
    @command_class ||= command_class_name&.safe_constantize
  end

  def command_instance
    @command_instance ||= command_class&.new(controller, command_params).tap do |instance|
      instance&.add_observer self, :handle_command_event
    end
  end

  def command_aborted?
    !!command_instance&.aborted?
  end

  def command_errored?
    !!command_instance&.errored?
  end

  def command_performed?
    !!command_instance&.performed?
  end

  def command_succeeded?
    !!command_instance&.succeeded?
  end

  def controller_action_prevented?
    !!@controller_action_prevented
  end

  def should_prevent_controller_action?
    return false unless command_performed?
    command_instance.should_prevent_controller_action? command_method_name
  end

  def run
    return unless command_valid?
    return if command_aborted?
    return if command_errored?
    return if command_performed?
    command_instance.perform_with_callbacks command_method_name
  end

  def prevent_controller_action(error: nil)
    return if controller_action_prevented?
    @controller_action_prevented = true

    if error
      render_response status: :internal_server_error
      append_error_to_response error
    else
      render_response
      append_success_to_response
    end

    append_meta_tag_to_response_body # called before `write_cookie` so all state is emitted to the DOM
    state.write_cookie # truncates state to stay within cookie size limits (4k)
  end

  def update_response
    return if controller_action_prevented?
    return if @update_response_performed
    @update_response_performed = true

    append_meta_tag_to_response_body # called before `write_cookie` so all state is emitted to the DOM
    state.write_cookie # truncates state to stay within cookie size limits (4k)
    append_success_to_response if command_succeeded?
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to update the response! #{error.message}"
  end

  def render_response(html: "", status: nil, headers: {TurboBoost: :Append})
    headers.each { |key, value| controller.response.set_header key.to_s, value.to_s }
    controller.render html: html, layout: false, status: status || response_status
  end

  def turbo_stream
    @turbo_stream ||= Turbo::Streams::TagBuilder.new(controller.view_context)
  end

  def message_verifier
    ActiveSupport::MessageVerifier.new Rails.application.secret_key_base, digest: "SHA256"
  end

  # Same implementation as ActionController::Base but with public visibility
  def cookies
    controller.request.cookie_jar
  end

  def handle_command_event(event, error: nil)
    case event
    when :aborted, :errored then prevent_controller_action(error: error)
    when :performed then prevent_controller_action if should_prevent_controller_action?
    end
  end

  private

  def parsed_command_params
    @parsed_command_params ||= JSON.parse(controller.params[:turbo_boost_command])
  end

  def content_sanitizer
    TurboBoost::Commands::Sanitizer.instance
  end

  def new_token
    @new_token ||= SecureRandom.urlsafe_base64(12)
  end

  def server_token
    cookies.encrypted["turbo_boost.token"]
  end

  def client_token
    (controller.request.headers["TurboBoost-Token"] || command_params[:token]).to_s
  end

  def valid_client_token?
    return true unless Rails.configuration.turbo_boost_commands.validate_client_token
    return false unless client_token.present?
    return false unless message_verifier.valid_message?(client_token)
    unmasked_client_token = message_verifier.verify(client_token)
    unmasked_client_token == server_token
  end

  def should_redirect?
    return false if controller.request.method.match?(/GET/i)
    controller.request.accepts.include? Mime::Type.lookup_by_extension(:turbo_stream)
  end

  def response_status
    return :multiple_choices if should_redirect?
    :ok
  end

  def response_type
    body = (controller.response_body.try(:join) || controller.response_body.to_s).strip
    return :body if body.match?(/<\/\s*body/i)
    return :frame if body.match?(/<\/\s*turbo-frame/i)
    return :stream if body.match?(/<\/\s*turbo-stream/i)
    :unknown
  end

  def append_success_to_response
    append_success_event_to_response_body
    append_streams_to_response_body
  end

  def append_error_to_response(error)
    message = "Error in #{command_name}! #{error.inspect} #{error.backtrace[0, 4].inspect}"
    Rails.logger.error message
    append_error_event_to_response_body message
  end

  def append_streams_to_response_body
    return unless command_instance.turbo_streams.present?
    append_to_response_body command_instance.turbo_streams.map(&:to_s).join.html_safe
  end

  def append_meta_tag_to_response_body
    cookies.encrypted["turbo_boost.token"] = {value: new_token, path: "/"}
    append_to_response_body turbo_stream.invoke("morph", args: [meta_tag], selector: "#turbo-boost")
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to append the meta tag to the response! #{error.message}"
  end

  def append_success_event_to_response_body
    args = ["turbo-boost:command:success", {bubbles: true, cancelable: false, detail: parsed_command_params}]
    event = if command_instance&.element.try(:id).present?
      turbo_stream.invoke :dispatch_event, args: args, selector: "##{command_instance.element.id}"
    else
      turbo_stream.invoke :dispatch_event, args: args
    end
    append_to_response_body event
  end

  def append_error_event_to_response_body(message)
    args = ["turbo-boost:command:server-error", {bubbles: true, cancelable: false, detail: parsed_command_params.merge(error: message)}]
    event = if command_instance&.element.try(:id).present?
      turbo_stream.invoke :dispatch_event, args: args, selector: "##{command_instance.element.id}"
    else
      turbo_stream.invoke :dispatch_event, args: args
    end
    append_to_response_body event
  end

  def append_to_response_body(content)
    return unless controller.response.media_type == "text/html"
    sanitized_content = content_sanitizer.sanitize(content).html_safe
    return if sanitized_content.blank?

    html = case response_type
    when :body
      match = controller.response.body.match(/<\/\s*body/i).to_s
      controller.response.body.sub match, [sanitized_content, match].join
    when :frame
      match = controller.response.body.match(/<\/\s*turbo-frame/i).to_s
      controller.response.body.sub match, [sanitized_content, match].join
    else
      [controller.response.body, sanitized_content].join
    end

    controller.response.body = html
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to append to the response! #{error.message}"
  end
end
