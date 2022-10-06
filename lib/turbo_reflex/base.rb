# frozen_string_literal: true

# Reflex instances have access to the following methods and properties.
#
# * controller .................. The Rails controller processing the HTTP request
# * element ..................... A struct that represents the DOM element that triggered the reflex
# * params ...................... Reflex specific params (frame_id, element, etc.)
# * render ...................... Renders Rails templates, partials, etc. (doesn't halt controller request handling)
# * renderer .................... An ActionController::Renderer
# * rewrite_response_body ....... Allows the rails controller/action to run (including rendering) but rewrites the response.body with TurboReflex streams
# * prevent_controller_action ... Prevents the rails controller/action from running (i.e. the reflex handles the response entirely)
# * turbo_stream ................ A Turbo Stream TagBuilder
# * turbo_streams ............... A list of Turbo Streams to append to the response
#
class TurboReflex::Base
  class << self
    def preventers
      @preventers ||= Set.new
    end

    def rewriters
      @rewriters ||= Set.new
    end

    def prevent_controller_action(options = {})
      preventers << options.with_indifferent_access
    end

    def rewrite_response_body(options = {})
      rewriters << options.with_indifferent_access
    end

    def should_prevent_controller_action?(reflex, method_name)
      apply_behavior? :prevent_controller_action, reflex, method_name
    end

    def should_rewrite_response_body?(reflex, method_name)
      apply_behavior? :rewrite_response_body, reflex, method_name
    end

    private

    def apply_behavior?(behavior, reflex, method_name)
      list = case behavior
      when :prevent_controller_action then preventers
      when :rewrite_response_body then rewriters
      end

      method_name = method_name.to_s
      match = list.find do |options|
        only = options[:only] || []
        only = [only] unless only.is_a?(Array)
        only.map!(&:to_s)

        except = options[:except] || []
        except = [except] unless except.is_a?(Array)
        except.map!(&:to_s)

        options.blank? || only.include?(method_name) || except.exclude?(method_name)
      end

      return false if match.nil?

      if match[:if].present?
        case match[:if]
        when Symbol then reflex.public_send(match[:if])
        when Proc then reflex.instance_exec { match[:if].call reflex }
        end
      elsif match[:unless].present?
        case match[:unless]
        when Symbol then !reflex.public_send(match[:unless])
        when Proc then !(reflex.instance_exec { match[:unless].call(reflex) })
        end
      else
        true
      end
    end
  end

  attr_reader :controller, :turbo_streams

  delegate :render, to: :renderer
  delegate(
    :controller_action_prevented?,
    :response_body_rewritten?,
    :turbo_stream,
    to: :@runner
  )

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

  def should_prevent_controller_action?(method_name)
    self.class.should_prevent_controller_action? self, method_name
  end

  def should_rewrite_response_body?(method_name)
    self.class.should_rewrite_response_body? self, method_name
  end
end
