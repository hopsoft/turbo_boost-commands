# frozen_string_literal: true

class TurboReflex::Base
  attr_reader :controller, :turbo_streams

  delegate :render, to: :renderer

  def initialize(controller)
    @controller = controller
    @turbo_streams = Set.new
  end

  def params
    controller.turbo_reflex_params
  end

  def element
    @element ||= begin
      keys = params[:element].keys.map { |key| key.to_s.parameterize.underscore.to_sym }
      values = params[:element].values

      unless keys.include? :value
        keys << :value
        values << nil
      end

      Struct.new(*keys).new(*values)
    end
  end

  def turbo_stream
    @turbo_stream ||= Turbo::Streams::TagBuilder.new(controller.view_context)
  end

  def renderer
    ActionController::Renderer.for controller.class, controller.request.env
  end
end
