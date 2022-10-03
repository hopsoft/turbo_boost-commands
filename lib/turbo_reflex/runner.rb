# frozen_string_literal: true

class TurboReflex::Runner
  attr_reader :controller

  delegate_missing_to :controller

  def initialize(controller)
    @controller = controller
  end

  def meta_tag
    masked_token = message_verifier.generate(new_token)
    options = {
      id: "turbo-reflex",
      name: "turbo-reflex",
      content: masked_token,
      data: {busy: false}
    }
    view_context.tag("meta", options).html_safe
  end

  def reflex_requested?
    reflex_params.present?
  end

  def reflex_valid?
    return false unless reflex_requested?
    return false unless valid_client_token?
    return false unless reflex_instance.is_a?(TurboReflex::Base)
    reflex_instance.respond_to? reflex_method_name
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

  def reflex_succeeded?
    reflex_performed? && !reflex_errored?
  end

  def run
    return unless reflex_valid?
    return if reflex_performed?
    @reflex_performed = true
    reflex_instance.public_send reflex_method_name
    hijack_response if reflex_class.should_hijack_response?(reflex_instance, reflex_method_name)
  rescue => e
    response.status = :internal_server_error
    @reflex_errored = true
    message = "Error in #{reflex_name}! #{e.inspect}"
    Rails.logger.error message
    append_error_event_to_response_body message
  end

  def hijack_response
    response.set_header "TurboReflex-Hijacked", true
    render html: "", layout: false
    append_to_response
  end

  def append_to_response
    append_turbo_streams_to_response_body
    append_meta_tag_to_response_body
    append_success_event_to_response_body
  end

  def turbo_stream
    @turbo_stream ||= Turbo::Streams::TagBuilder.new(controller.view_context)
  end

  private

  def parsed_reflex_params
    @parsed_reflex_params ||= JSON.parse(params[:turbo_reflex])
  end

  def message_verifier
    ActiveSupport::MessageVerifier.new session.id.to_s, digest: "SHA256"
  end

  def content_sanitizer
    TurboReflex::Sanitizer.instance
  end

  def new_token
    @new_token ||= SecureRandom.urlsafe_base64(32)
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

  def response_type
    body = response.body.to_s.strip
    return :body if body.match?(/<\/\s*body.*>/i)
    return :frame if body.match?(/<\/\s*turbo-frame.*>/i)
    return :stream if body.match?(/<\/\s*turbo-stream.*>/i)
    :unknown
  end

  def append_turbo_streams_to_response_body
    return unless reflex_succeeded?
    return unless reflex_instance&.turbo_streams.present?
    append_to_response_body reflex_instance.turbo_streams.map(&:to_s).join.html_safe
  end

  def append_meta_tag_to_response_body
    session[:turbo_reflex_token] = new_token
    append_to_response_body turbo_stream.replace("turbo-reflex", meta_tag)
  end

  def append_success_event_to_response_body
    return unless reflex_succeeded?
    args = ["turbo-reflex:success", {bubbles: true, cancelable: false, detail: parsed_reflex_params}]
    event = if reflex_element.try(:id).present?
      turbo_stream.invoke :dispatch_event, args: args, selector: "##{reflex_element.id}"
    else
      turbo_stream.invoke :dispatch_event, args: args
    end
    append_to_response_body event
  end

  def append_error_event_to_response_body(message)
    return unless reflex_errored?
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
    else response.body << sanitized_content
    end
  end
end
