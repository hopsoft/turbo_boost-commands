# frozen_string_literal: true

module TurboReflex::Behavior
  extend ActiveSupport::Concern
  include ActionView::Helpers::SanitizeHelper

  included do
    before_action :perform_turbo_reflex, if: -> { turbo_reflex_requested? && turbo_reflex_valid? }
    after_action :append_turbo_reflex_turbo_streams, if: :turbo_reflex_performed?
  end

  def turbo_reflex_params
    return nil if params[:turbo_reflex].nil?
    @turbo_reflex_params ||= begin
      payload = JSON.parse(params[:turbo_reflex]).deep_transform_keys(&:underscore)
      ActionController::Parameters.new(payload).permit!
    end
  end

  def turbo_reflex_requested?
    turbo_reflex_params.present?
  end

  def turbo_reflex_name
    return nil unless turbo_reflex_requested?
    turbo_reflex_params.require(:name)
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

  def turbo_reflex_element
    return nil if turbo_reflex_params.nil?
    @turbo_reflex_element ||= Struct.new(*turbo_reflex_params[:element].keys.map { |key| key.to_s.parameterize.underscore.to_sym })
      .new(*turbo_reflex_params[:element].values)
  end

  def turbo_reflex_valid?
    return false unless turbo_reflex_instance.is_a?(TurboReflex::Base)
    turbo_reflex_instance.respond_to? turbo_reflex_method_name
  end

  def turbo_reflex_performed?
    !!@turbo_reflex_performed
  end

  protected

  def perform_turbo_reflex
    turbo_reflex_instance.public_send turbo_reflex_method_name
    @turbo_reflex_performed = true
  end

  def append_turbo_reflex_turbo_streams
    return unless turbo_reflex_performed?
    return unless turbo_reflex_instance&.turbo_streams.present?

    extras = turbo_reflex_instance.turbo_streams.map(&:to_s).join
    sanitized_extras = TurboReflex::Sanitizer.instance.sanitize(extras)
    response.body.sub! "</turbo-frame>", "#{sanitized_extras}</turbo-frame>"
  end
end
