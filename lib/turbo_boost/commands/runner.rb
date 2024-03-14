# frozen_string_literal: true

require_relative "sanitizer"
require_relative "state"

class TurboBoost::Commands::Runner
  RESPONSE_HEADER = "TurboBoost-Command"

  SUPPORTED_MEDIA_TYPES = {
    "text/html" => true,
    "text/vnd.turbo-boost.html" => true,
    "text/vnd.turbo-stream.html" => true
  }.freeze

  attr_reader :controller

  def initialize(controller)
    @controller = controller
  end

  def command_state
    @command_state ||= begin
      sgid = command_params[:signed_state]
      value = TurboBoost::Commands::State.from_sgid_param(sgid) if sgid
      value || TurboBoost::Commands::State.new
    end
  end

  def command_requested?
    controller.request.env.key?("turbo_boost_command") || controller.params.key?("turbo_boost_command")
  end

  def command_valid?
    return false unless command_requested?

    # validate class
    unless command_instance.is_a?(TurboBoost::Commands::Command)
      raise TurboBoost::Commands::InvalidClassError,
        "`#{command_class_name}` is not a subclass of `TurboBoost::Commands::Command`!"
    end

    # validate method
    ancestors = command_class.ancestors[0..command_class.ancestors.index(TurboBoost::Commands::Command) - 1]
    unless ancestors.any? { |a| a.public_instance_methods(false).any? command_method_name.to_sym }
      raise TurboBoost::Commands::InvalidMethodError,
        "`#{command_class_name}` does not define the public method `#{command_method_name}`!"
    end

    # validate csrf token
    unless valid_command_token?
      raise TurboBoost::Commands::InvalidTokenError,
        "Token mismatch! The token: #{client_command_token}` does not match the expected value of `#{server_command_token}`."
    end

    true
  end

  def command_params
    return ActionController::Parameters.new unless command_requested?
    @command_params ||= begin
      payload = parsed_command_params.transform_keys(&:underscore)
      payload["element_attributes"]&.deep_transform_keys!(&:underscore)
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
    @command_instance ||= command_class&.new(controller, command_state, command_params).tap do |instance|
      instance&.add_observer self, :handle_command_event
    end
  end

  def command_aborted?
    !!command_instance&.aborted?
  end

  def command_errored?
    !!command_instance&.errored?
  end

  def command_performing?
    !!command_instance&.performing?
  end

  def command_performed?
    !!command_instance&.performed?
  end

  def command_succeeded?
    !!command_instance&.succeeded?
  end

  def controller_action_allowed?
    !controller_action_prevented?
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
    return if command_performing?
    return if command_performed?

    command_instance.resolve_state command_params[:changed_state]
    command_instance.perform_with_callbacks command_method_name
  end

  def prevent_controller_action(error: nil)
    return if controller_action_prevented?
    @controller_action_prevented = true

    case error
    when nil
      render_response status: response_status
      append_success_to_response
    when TurboBoost::Commands::AbortError
      render_response status: error.http_status_code, status_header: error.message
      append_streams_to_response_body
    when TurboBoost::Commands::PerformError
      render_response status: error.http_status_code, status_header: error.message
      append_error_to_response error
    else
      render_response status: :internal_server_error, status_header: error.message
      append_error_to_response error
    end

    append_command_state_to_response_body
  end

  def update_response
    return if @update_response_performed
    @update_response_performed = true

    return if controller_action_prevented?

    append_command_state_to_response_body
    append_to_response_headers if command_performed?
    append_success_to_response if command_succeeded?
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to update the response! #{error.message}"
  end

  def render_response(html: "", status: nil, status_header: nil)
    controller.render html: html, layout: false, status: status || response_status # unless controller.performed?
    append_to_response_headers status_header
  end

  def turbo_stream
    @turbo_stream ||= Turbo::Streams::TagBuilder.new(controller.view_context)
  end

  def message_verifier
    ActiveSupport::MessageVerifier.new Rails.application.secret_key_base, digest: "SHA256", url_safe: true
  rescue
    ActiveSupport::MessageVerifier.new Rails.application.secret_key_base, digest: "SHA256"
  end

  def handle_command_event(*args)
    event = args.shift
    options = args.extract_options!
    case event
    when :aborted, :errored then prevent_controller_action error: options[:error]
    when :performed then prevent_controller_action if should_prevent_controller_action?
    end
  end

  private

  def parsed_command_params
    @parsed_command_params ||= begin
      params = controller.request.env["turbo_boost_command"]
      params ||= JSON.parse(controller.params["turbo_boost_command"])
      params || {}
    end
  end

  def content_sanitizer
    TurboBoost::Commands::Sanitizer.instance
  end

  def new_command_token
    @new_command_token ||= SecureRandom.alphanumeric(13)
  end

  def client_command_token
    command_params.dig(:client_state, :command_token)
  end

  def server_command_token
    command_state[:command_token]
  end

  def valid_command_token?
    return true unless Rails.configuration.turbo_boost_commands.protect_from_forgery
    return false unless client_command_token.present?
    return false unless server_command_token.present?
    server_command_token == message_verifier.verify(client_command_token, purpose: controller.request.session&.id)
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    false
  end

  def should_redirect?
    return false if controller.request.get?
    controller.request.accepts.include? Mime::Type.lookup_by_extension(:turbo_stream)
  end

  def response_status
    return :multiple_choices if should_redirect?
    :ok
  end

  def response_type
    body = (controller.response_body.try(:join) || controller.response_body.to_s).strip
    return :body if body.match?(/<\/\s*body/io)
    return :frame if body.match?(/<\/\s*turbo-frame/io)
    return :stream if body.match?(/<\/\s*turbo-stream/io)
    :unknown
  end

  # Indicates if a TurboStream template exists for the current action.
  # Any template with the format of :turbo_boost or :turbo_stream format is considered a match.
  # @return [Boolean] true if a TurboStream template exists, false otherwise
  def turbo_stream_template_exists?
    controller.lookup_context.exists? controller.action_name, controller.lookup_context.prefixes, formats: [:turbo_boost, :turbo_stream]
  end

  def rendering_strategy
    # Use the replace strategy if the follow things are true:
    #
    # 1. The command was triggered by the WINDOW driver
    # 2. After the command finishes, normal Rails mechanics resume (i.e. prevent_controller_action was not called)
    # 3. There is NO TurboStream template for the current action (i.e. example.turbo_boost.erb, example.turbo_frame.erb)
    #
    # TODO: Revisit the "Replace" strategy after morph ships with Turbo 8
    if command_params[:driver] == "window" && controller_action_allowed?
      return "Replace" unless turbo_stream_template_exists?
    end

    "Append"
  end

  def append_success_to_response
    append_success_event_to_response_body
    append_streams_to_response_body
  end

  def append_error_to_response(error)
    Rails.logger.error error.message
    append_error_event_to_response_body error.message
    append_error_alert_to_response_body error.message
  end

  def append_streams_to_response_body
    command_instance.turbo_streams.each { |stream| append_to_response_body stream }
  end

  def append_command_state_to_response_body
    # use the masked token for the client state
    command_state[:command_token] = message_verifier.generate(new_command_token, purpose: controller.request.session&.id)
    client_state = command_state.to_json

    # use the unmasked token for the signed (server) state
    command_state[:command_token] = new_command_token
    signed_state = command_state.to_sgid_param

    append_to_response_body turbo_stream.invoke("TurboBoost.State.initialize", args: [client_state, signed_state], camelize: false)
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to append the Command state to the response! #{error.message}"
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

  def append_error_alert_to_response_body(message)
    return unless Rails.env.development?
    message = <<~MSG
      #{message}

      See the HTTP header: `TurboBoost-Command-Status`

      Also check the JavaScript console if `TurboBoost.Commands.logger.level` has been set.

      Finally, check server logs for additional info.
    MSG
    append_to_response_body turbo_stream.invoke(:alert, args: [message])
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

  def appended_content
    @appended_content ||= {}
  end

  def append_to_response_body(content)
    return unless SUPPORTED_MEDIA_TYPES[controller.response.media_type]
    sanitized_content = content_sanitizer.sanitize(content.to_s).html_safe
    return if sanitized_content.blank?

    return if appended_content[sanitized_content]
    appended_content[sanitized_content] = true

    html = case response_type
    when :body
      match = controller.response.body.match(/<\/\s*body/io).to_s
      controller.response.body.sub match, [sanitized_content, match].join
    when :frame
      match = controller.response.body.match(/<\/\s*turbo-frame/io).to_s
      controller.response.body.sub match, [sanitized_content, match].join
    else
      [controller.response.body, sanitized_content].join
    end

    controller.response.body = html
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to append to the response! #{error.message}"
  end

  # Writes new header... will not overwrite existing header
  def append_response_header(key, value)
    return if controller.response.get_header key.to_s
    controller.response.set_header key.to_s, value.to_s
  end

  def append_to_response_headers(status = nil)
    return unless command_performed?

    values = [
      status || "#{controller.response.status} #{TurboBoost::Commands::HTTP_STATUS_CODES[controller.response.status]}".delete(","),
      rendering_strategy,
      command_name
    ]

    append_response_header RESPONSE_HEADER, values.join(", ")
  end
end
