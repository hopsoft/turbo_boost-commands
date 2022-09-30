# frozen_string_literal: true

# Reflex instances have access to the following methods and properties.
#
# * controller ........ The Rails controller processing the HTTP request
# * element ........... A struct that represents the DOM element that triggered the reflex
# * hijack_response ... Hijacks the response, must be called last (halts further request handling by the controller)
# * params ............ Reflex specific params (frame_id, element, etc.)
# * render ............ Renders Rails templates, partials, etc. (doesn't halt controller request handling)
# * renderer .......... An ActionController::Renderer
# * turbo_stream ...... A Turbo Stream TagBuilder
# * turbo_streams ..... A list of Turbo Streams to append to the response
#
class TurboReflex::Base
  attr_reader :controller, :turbo_streams

  delegate :render, to: :renderer
  delegate :hijack_response, :turbo_stream, to: :@runner

  def initialize(runner)
    @runner = runner
    @controller = runner.controller
    @turbo_streams = Set.new
  end

  def params
    @runner.reflex_params
  end

  def element
    @element ||= begin
      keys = params[:element_attributes].keys.map { |key| key.to_s.parameterize.underscore.to_sym }
      values = params[:element_attributes].values

      unless keys.include? :value
        keys << :value
        values << nil
      end

      Struct.new(*keys).new(*values)
    end
  end

  def renderer
    ActionController::Renderer.for controller.class, controller.request.env
  end
end
