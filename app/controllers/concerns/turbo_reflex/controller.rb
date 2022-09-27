# frozen_string_literal: true

module TurboReflex::Controller
  extend ActiveSupport::Concern

  included do
    before_action :perform_turbo_reflex, if: -> { turbo_reflex_requested? && turbo_reflex_valid? }
    after_action :append_turbo_reflex_turbo_streams, if: :turbo_reflex_performed?
    after_action :assign_turbo_reflex_token
    helper_method :turbo_reflex_meta_tag, :turbo_reflex_performed?, :turbo_reflex_requested?
    # helper TurboReflex::TurboReflexHelper # only required if we isolate_namespace
  end

  def turbo_reflex_meta_tag
    masked_token = turbo_reflex_message_verifier.generate(new_turbo_reflex_token)
    options = {id: "turbo-reflex-token", name: "turbo-reflex-token", content: masked_token}
    view_context.tag("meta", options).html_safe
  end

  def turbo_reflex_params
    return ActionController::Parameters.new if params[:turbo_reflex].nil?
    @turbo_reflex_params ||= begin
      payload = JSON.parse(params[:turbo_reflex]).deep_transform_keys(&:underscore)
      ActionController::Parameters.new(payload).permit!
    end
  end

  def turbo_reflex_requested?
    return false unless client_turbo_reflex_token.present?
    return false unless turbo_reflex_params.present?
    true
  end

  def turbo_reflex_element
    return nil if turbo_reflex_params.blank?
    @turbo_reflex_element ||= Struct
      .new(*turbo_reflex_params[:element].keys.map { |key| key.to_s.parameterize.underscore.to_sym })
      .new(*turbo_reflex_params[:element].values)
  end

  def turbo_reflex_name
    return nil unless turbo_reflex_requested?
    turbo_reflex_element.data_turbo_reflex
  end

  def turbo_reflex_class_name
    return nil unless turbo_reflex_requested?
    turbo_reflex_name.split("#").first
  end

  def turbo_reflex_method_name
    return nil unless turbo_reflex_requested?
    turbo_reflex_name.split("#").last
  end

  def turbo_reflex_class
    @turbo_reflex_class ||= turbo_reflex_class_name&.safe_constantize
  end

  def turbo_reflex_instance
    @turbo_reflex_instance ||= turbo_reflex_class&.new(self)
  end

  def turbo_reflex_valid?
    return false if request.get? && client_turbo_reflex_token.blank?
    return false unless valid_turbo_reflex_token?
    return false unless turbo_reflex_instance.is_a?(TurboReflex::Base)
    turbo_reflex_instance.respond_to? turbo_reflex_method_name
  end

  def turbo_reflex_performed?
    !!@turbo_reflex_performed
  end

  protected

  def perform_turbo_reflex
    @turbo_reflex_performed = true
    turbo_reflex_instance.public_send turbo_reflex_method_name
  end

  def append_turbo_reflex_turbo_streams
    return unless turbo_reflex_performed?
    return unless turbo_reflex_instance&.turbo_streams.present?
    append_turbo_reflex_content turbo_reflex_instance.turbo_streams.map(&:to_s).join
  end

  private

  def turbo_reflex_message_verifier
    ActiveSupport::MessageVerifier.new session.id.to_s, digest: "SHA256"
  end

  def client_turbo_reflex_token
    (request.headers["Turbo-Reflex"] || turbo_reflex_params[:token]).to_s
  end

  def new_turbo_reflex_token
    @new_turbo_reflex_token ||= SecureRandom.urlsafe_base64(32)
  end

  def current_turbo_reflex_token
    session[:turbo_reflex_token]
  end

  def valid_turbo_reflex_token?
    return false unless turbo_reflex_message_verifier.valid_message?(client_turbo_reflex_token)
    unmasked_token = turbo_reflex_message_verifier.verify(client_turbo_reflex_token)
    unmasked_token == current_turbo_reflex_token
  end

  def assign_turbo_reflex_token
    return unless turbo_reflex_requested? || client_turbo_reflex_token.blank?
    session[:turbo_reflex_token] = new_turbo_reflex_token
    append_turbo_reflex_content turbo_stream.replace("turbo-reflex-token", turbo_reflex_meta_tag)
  end

  def turbo_reflex_response_type
    body = response.body.to_s.strip
    return :stream if body.ends_with?("</turbo-stream>")
    return :frame if body.ends_with?("</turbo-frame>")
    :default
  end

  def append_turbo_reflex_content(content)
    sanitized_content = TurboReflex::Sanitizer.instance.sanitize(content).html_safe
    case turbo_reflex_response_type
    when :stream then response.body << sanitized_content
    when :frame then response.body.sub!("</turbo-frame>", "#{sanitized_content}</turbo-frame>")
    when :default then response.body.sub!("</body>", "#{sanitized_content}</body>")
    end
  end
end
