# frozen_string_literal: true

require_relative "errors"
require_relative "sanitizer"
require_relative "state_manager"

class TurboReflex::Runner
  attr_reader :controller, :state_manager
  alias_method :state, :state_manager

  delegate_missing_to :controller

  def initialize(controller)
    @controller = controller
    @state_manager = TurboReflex::StateManager.new(self)
  end

  def meta_tag
    masked_token = message_verifier.generate(new_token)
    options = {
      id: "turbo-reflex",
      name: "turbo-reflex",
      content: masked_token,
      data: {busy: false, state: state_manager.payload}
    }
    view_context.tag("meta", options).html_safe
  end

  def reflex_requested?
    reflex_params.present?
  end

  def reflex_valid?
    return false unless reflex_requested?

    # validate class
    unless reflex_instance.is_a?(TurboReflex::Base)
      raise TurboReflex::InvalidClassError,
        "`#{reflex_class_name}` is not a subclass of `TurboReflex::Base`!"
    end

    # validate method
    unless reflex_instance.respond_to?(reflex_method_name)
      raise TurboReflex::InvalidMethodError,
        "`#{reflex_class_name}` does not define the public method `#{reflex_method_name}`!"
    end

    # validate csrf token
    unless valid_client_token?
      raise TurboReflex::InvalidTokenError,
        "CSRF token mismatch! The request header `TurboReflex-Token: #{client_token}` does not match the expected value of `#{server_token}`."
    end

    true
  end

  def reflex_params
    return ActionController::Parameters.new if params[:turbo_reflex].nil?
    @reflex_params ||= begin
      payload = parsed_reflex_params.deep_transform_keys(&:underscore)
      ActionController::Parameters.new(payload).permit!
    end
  end

  def reflex_element
    return nil if reflex_params.blank?
    @reflex_element ||= Struct
      .new(*reflex_params[:element_attributes].keys.map { |key| key.to_s.parameterize.underscore.to_sym })
      .new(*reflex_params[:element_attributes].values)
  end

  def reflex_name
    return nil unless reflex_requested?
    reflex_params[:name]
  end

  def reflex_class_name
    return nil unless reflex_requested?
    reflex_name.split("#").first
  end

  def reflex_method_name
    return nil unless reflex_requested?
    return "noop" unless reflex_name.include?("#")
    reflex_name.split("#").last
  end

  def reflex_class
    @reflex_class ||= reflex_class_name&.safe_constantize
  end

  def reflex_instance
    @reflex_instance ||= reflex_class&.new(self)
  end

  def reflex_performed?
    !!@reflex_performed
  end

  def reflex_errored?
    !!@reflex_errored
  end

  def controller_action_prevented?
    !!@controller_action_prevented
  end

  def reflex_succeeded?
    reflex_performed? && !reflex_errored?
  end

  def should_prevent_controller_action?
    return false unless reflex_performed?
    reflex_instance.should_prevent_controller_action? reflex_method_name
  end

  def run
    return unless reflex_valid?
    return if reflex_performed?
    @reflex_performed = true
    reflex_instance.public_send reflex_method_name
    prevent_controller_action if should_prevent_controller_action?
  rescue => error
    @reflex_errored = true
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

    append_meta_tag_to_response_body # called before `set_cookie` so all state is emitted to the DOM
    state_manager.set_cookie # truncates state to stay within cookie size limits (4k)
  end

  def update_response
    return if controller_action_prevented?
    return if @update_response_performed
    @update_response_performed = true

    append_meta_tag_to_response_body # called before `set_cookie` so all state is emitted to the DOM
    state_manager.set_cookie # truncates state to stay within cookie size limits (4k)
    append_success_to_response if reflex_succeeded?
  end

  def render_response(html: "", status: nil, headers: {TurboReflex: :Append})
    headers.each { |key, value| response.set_header key.to_s, value.to_s }
    controller.render html: html, layout: false, status: status || response_status
  end

  def turbo_stream
    @turbo_stream ||= Turbo::Streams::TagBuilder.new(controller.view_context)
  end

  def message_verifier
    ActiveSupport::MessageVerifier.new session.id.to_s, digest: "SHA256"
  end

  private

  def parsed_reflex_params
    @parsed_reflex_params ||= JSON.parse(params[:turbo_reflex])
  end

  def content_sanitizer
    TurboReflex::Sanitizer.instance
  end

  def new_token
    @new_token ||= SecureRandom.urlsafe_base64(12)
  end

  def server_token
    session[:turbo_reflex_token]
  end

  def client_token
    (request.headers["TurboReflex-Token"] || reflex_params[:token]).to_s
  end

  def valid_client_token?
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
    body = controller.response_body.to_s.strip
    return :body if body.match?(/<\/\s*body.*>/i)
    return :frame if body.match?(/<\/\s*turbo-frame.*>/i)
    return :stream if body.match?(/<\/\s*turbo-stream.*>/i)
    :unknown
  end

  def append_success_to_response
    append_success_event_to_response_body
    append_streams_to_response_body
  end

  def append_error_to_response(error)
    message = "Error in #{reflex_name}! #{error.inspect} #{error.backtrace[0, 4].inspect}"
    Rails.logger.error message
    append_error_event_to_response_body message
  end

  def append_streams_to_response_body
    return unless reflex_instance.turbo_streams.present?
    append_to_response_body reflex_instance.turbo_streams.map(&:to_s).join.html_safe
  end

  def append_meta_tag_to_response_body
    session[:turbo_reflex_token] = new_token
    append_to_response_body turbo_stream.invoke("morph", args: [meta_tag], selector: "#turbo-reflex")
  end

  def append_success_event_to_response_body
    args = ["turbo-reflex:success", {bubbles: true, cancelable: false, detail: parsed_reflex_params}]
    event = if reflex_element.try(:id).present?
      turbo_stream.invoke :dispatch_event, args: args, selector: "##{reflex_element.id}"
    else
      turbo_stream.invoke :dispatch_event, args: args
    end
    append_to_response_body event
  end

  def append_error_event_to_response_body(message)
    args = ["turbo-reflex:server-error", {bubbles: true, cancelable: false, detail: parsed_reflex_params.merge(error: message)}]
    event = if reflex_element.try(:id).present?
      turbo_stream.invoke :dispatch_event, args: args, selector: "##{reflex_element.id}"
    else
      turbo_stream.invoke :dispatch_event, args: args
    end
    append_to_response_body event
  end

  def append_to_response_body(content)
    sanitized_content = content_sanitizer.sanitize(content).html_safe

    return if sanitized_content.blank?

    case response_type
    when :body then response.body.sub!(/<\/\s*body.*>/i, "#{sanitized_content}</body>")
    when :frame then response.body.sub!(/<\/\s*turbo-frame.*>/i, "#{sanitized_content}</turbo-frame>")
    else controller.response_body << sanitized_content
    end
  end
end
