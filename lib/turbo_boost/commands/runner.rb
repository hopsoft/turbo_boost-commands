# frozen_string_literal: true

require_relative "responder"
require_relative "state_collection"

class TurboBoost::Commands::Runner
  RESPONSE_HEADER = "TurboBoost-Command"

  SUPPORTED_MEDIA_TYPES = {
    "text/html" => true,
    "text/vnd.turbo-boost.html" => true,
    "text/vnd.turbo-stream.html" => true
  }.freeze

  attr_reader :controller, :error, :responder

  def initialize(controller)
    @controller = controller
    @responder = TurboBoost::Commands::Responder.new
  end

  def supported_media_type?
    SUPPORTED_MEDIA_TYPES[controller.request.format.to_s]
  end

  def command_state_collection
    @command_states ||= TurboBoost::Commands::StateCollection.new(command_params.to_unsafe_hash[:state_collection])
  end

  def command_state
    @command_state ||= if command_requested?
      command_state_collection.key?(command_name) ?
        command_state_collection[command_name] :
        command_state_collection.push(name: command_name)[command_name]
    else
      TurboBoost::Commands::State.new
    end
  end

  def command_requested?
    controller.request.env.key?("turbo_boost_command_params") || controller.params.key?("turbo_boost_command")
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

    true
  end

  def command_params
    return ActionController::Parameters.new unless command_requested?
    @command_params ||= ActionController::Parameters.new(parsed_command_params).permit!
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
    @command_errored ||= !!command_instance&.errored?
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

    # command_instance.resolve_state command_params[:changed_state]
    command_instance.perform_with_callbacks command_method_name
  rescue => error
    @command_errored = true
    prevent_controller_action error: error if command_requested?
  end

  # Always runs after the controller action has been performed
  def flush
    return unless command_requested? # not a command request

    # global response components
    add_header
    add_state

    # mutually exclusive responses
    respond_with_abort if command_aborted?
    respond_with_error if command_errored?
    respond_with_success if command_succeeded?

    # store the responder for use in → TurboBoost::Commands::ExitMiddleware
    controller.request.env["turbo_boost_command_responder"] = responder
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to update the response! #{error.message}"
  end

  def prevent_controller_action(error: nil)
    return if controller_action_prevented?
    @controller_action_prevented = true
    @error = error

    status = case error
    when nil then response_status
    when TurboBoost::Commands::AbortError, TurboBoost::Commands::PerformError then error.http_status_code
    else :internal_server_error
    end

    flush
    render_response status: status
  end

  # Renders the response body instead of the controller action.
  # Invoked by: `prevent_controller_action`
  # NOTE: Halts the Rails controller callback chain
  def render_response(html: "", status: nil)
    return if controller.performed?
    controller.render html: html, layout: false, status: status || response_status
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
      params = controller.request.env["turbo_boost_command_params"]
      params ||= controller.request.env["turbo_boost_command_params"] = JSON.parse(controller.params["turbo_boost_command"])
      params.deep_transform_keys!(&:underscore)
      params
    end
  end

  def should_redirect?
    return false if controller.request.get?
    controller.request.accepts.include? Mime::Type.lookup_by_extension(:turbo_stream)
  end

  def response_status
    return :multiple_choices if should_redirect?
    :ok
  end

  # Indicates if a TurboStream template exists for the current action.
  # Any template with the format of :turbo_boost or :turbo_stream format is considered a match.
  # @return [Boolean] true if a TurboStream template exists, false otherwise
  def turbo_stream_template_exists?
    controller.lookup_context.exists? controller.action_name, controller.lookup_context.prefixes, formats: [:turbo_boost, :turbo_stream]
  end

  # Commands support the following redering strategies on the client.
  # 1. Replace: The entire page (head, body) is replaced with the new content via morph
  # 2. Append: The new content is appended to the body
  def client_render_strategy
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

  def respond_with_abort
    Rails.logger.error error.message
    add_abort_event error.message
  end

  def respond_with_error
    Rails.logger.error error.message
    add_error_event
    add_error_alert
  end

  def respond_with_success
    add_success_event
    add_turbo_streams
  end

  def add_turbo_streams
    command_instance.turbo_streams.each { |stream| add_content stream }
  end

  def add_state
    command_state_collection.each do |name, value|
      initial = value.to_json
      signed = value.to_sgid_param
      add_content turbo_stream.invoke("TurboBoost.State.initialize", args: [name, initial, signed], camelize: false)
    end
  rescue => error
    Rails.logger.error "TurboBoost::Commands::Runner failed to append the Command state to the response! #{error.message}"
  end

  def add_event(name, detail = {})
    detail = command_params.to_h.merge(detail).deep_transform_keys! { |key| key.to_s.camelize(:lower).to_sym }
    options = {
      args: [name, {
        bubbles: true,
        cancelable: false,
        detail: detail
      }]
    }
    options[:selector] = "##{command_instance.element.id}" if command_instance&.element&.id
    add_content turbo_stream.invoke(:dispatch_event, **options)
  end

  def add_success_event
    return unless command_succeeded?
    add_event "turbo-boost:command:success"
  end

  def add_abort_event
    return unless error && command_aborted?
    add_event "turbo-boost:command:abort", message: error.message
  end

  def add_error_event
    return unless error && command_errored?
    add_event "turbo-boost:command:server-error", message: error.message
  end

  def add_error_alert
    return unless Rails.env.development?
    return unless error && command_errored?

    message = <<~MSG
      #{error.message}\n\n
      See the HTTP header: `TurboBoost-Command`\n
      Also check the JavaScript console if `TurboBoost.Commands.logger.level` has been set.\n
      Finally, check server logs for additional info.
    MSG

    add_content turbo_stream.invoke(:alert, args: [message.strip])
  end

  def add_header
    return unless command_requested?
    return unless supported_media_type?

    command_status = "Abort" if command_aborted?
    command_status = "Error" if command_errored?
    command_status = "OK" if command_succeeded?
    command_status ||= "Unknown"

    values = [command_name, command_status, client_render_strategy]
    responder.add_header RESPONSE_HEADER, values.join(", ")
  end

  def add_content(content)
    return unless command_requested?
    return unless supported_media_type?

    responder.add_content content
  end
end
