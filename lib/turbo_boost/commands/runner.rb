# frozen_string_literal: true

require_relative "../errors"
require_relative "errors"
require_relative "sanitizer"
require_relative "../state/manager"

class TurboBoost::Commands::Runner
  attr_reader :controller, :state_manager
  alias_method :state, :state_manager

  delegate_missing_to :controller

  def initialize(controller)
    @controller = controller
    @state_manager = TurboBoost::State::Manager.new(self)
  end

  def meta_tag
    masked_token = message_verifier.generate(new_token)
    options = {
      id: "turbo-boost",
      name: "turbo-boost",
      content: masked_token,
      data: {busy: false, state: state_manager.payload}
    }
    view_context.tag("meta", options).html_safe
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
    return ActionController::Parameters.new if params[:turbo_boost_command].nil?
    @command_params ||= begin
      payload = parsed_command_params.deep_transform_keys(&:underscore)
      ActionController::Parameters.new(payload).permit!
    end
  end

  def command_element
    return nil if command_params.blank?
    @command_element ||= Struct
      .new(*command_params[:element_attributes].keys.map { |key| key.to_s.parameterize.underscore.to_sym })
      .new(*command_params[:element_attributes].values)
  end

  def command_name
    return nil unless command_requested?
    command_params[:name]
  end

  def command_class_name
    return nil unless command_requested?
    command_name.split("#").first
  end

  def command_method_name
    return nil unless command_requested?
    return "noop" unless command_name.include?("#")
    command_name.split("#").last
  end

  def command_class
    @command_class ||= command_class_name&.safe_constantize
  end

  def command_instance
    @command_instance ||= command_class&.new(self)
  end

  def command_performed?
    !!@command_performed
  end

  def command_errored?
    !!@command_errored
  end

  def controller_action_prevented?
    !!@controller_action_prevented
  end

  def command_succeeded?
    command_performed? && !command_errored?
  end

  def should_prevent_controller_action?
    return false unless command_performed?
    command_instance.should_prevent_controller_action? command_method_name
  end

  def run
    return unless command_valid?
    return if command_performed?
    @command_performed = true
    command_instance.public_send command_method_name
    prevent_controller_action if should_prevent_controller_action?
  rescue => error
    @command_errored = true
    raise error if controller_action_prevented?
    prevent_controller_action error: error
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
    state_manager.write_cookie # truncates state to stay within cookie size limits (4k)
  end

  def update_response
    return if controller_action_prevented?
    return if @update_response_performed
    @update_response_performed = true

    append_meta_tag_to_response_body # called before `write_cookie` so all state is emitted to the DOM
    state_manager.write_cookie # truncates state to stay within cookie size limits (4k)
    append_success_to_response if command_succeeded?
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to update the response! #{error.message}"
  end

  def render_response(html: "", status: nil, headers: {TurboBoost: :Append})
    headers.each { |key, value| response.set_header key.to_s, value.to_s }
    render html: html, layout: false, status: status || response_status
  end

  def turbo_stream
    @turbo_stream ||= Turbo::Streams::TagBuilder.new(view_context)
  end

  def message_verifier
    ActiveSupport::MessageVerifier.new Rails.application.secret_key_base, digest: "SHA256"
  end

  # Same implementation as ActionController::Base but with public visibility
  def cookies
    request.cookie_jar
  end

  private

  def parsed_command_params
    @parsed_command_params ||= JSON.parse(params[:turbo_boost_command])
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
    (request.headers["TurboBoost-Token"] || command_params[:token]).to_s
  end

  def valid_client_token?
    return true unless Rails.configuration.turbo_boost_commands.validate_client_token
    return false unless client_token.present?
    return false unless message_verifier.valid_message?(client_token)
    unmasked_client_token = message_verifier.verify(client_token)
    unmasked_client_token == server_token
  end

  def should_redirect?
    return false if request.method.match?(/GET/i)
    request.accepts.include? Mime::Type.lookup_by_extension(:turbo_stream)
  end

  def response_status
    return :multiple_choices if should_redirect?
    :ok
  end

  def response_type
    body = (response_body.try(:join) || response_body.to_s).strip
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
    event = if command_element.try(:id).present?
      turbo_stream.invoke :dispatch_event, args: args, selector: "##{command_element.id}"
    else
      turbo_stream.invoke :dispatch_event, args: args
    end
    append_to_response_body event
  end

  def append_error_event_to_response_body(message)
    args = ["turbo-boost:command:server-error", {bubbles: true, cancelable: false, detail: parsed_command_params.merge(error: message)}]
    event = if command_element.try(:id).present?
      turbo_stream.invoke :dispatch_event, args: args, selector: "##{command_element.id}"
    else
      turbo_stream.invoke :dispatch_event, args: args
    end
    append_to_response_body event
  end

  def append_to_response_body(content)
    return unless response.media_type == "text/html"
    sanitized_content = content_sanitizer.sanitize(content).html_safe
    return if sanitized_content.blank?

    html = case response_type
    when :body
      match = response.body.match(/<\/\s*body/i).to_s
      response.body.sub match, [sanitized_content, match].join
    when :frame
      match = response.body.match(/<\/\s*turbo-frame/i).to_s
      response.body.sub match, [sanitized_content, match].join
    else
      [response.body, sanitized_content].join
    end

    response.body = html
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to append to the response! #{error.message}"
  end
end
