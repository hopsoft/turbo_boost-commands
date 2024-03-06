# frozen_string_literal: true

require_relative "attribute_set"
require_relative "command_callbacks"
require_relative "command_validator"

# TurboBoost::Commands::Command superclass.
# All command classes should inherit from this class.
#
# Commands are executed via a before_action in the Rails controller lifecycle.
# They have access to the following methods and properties.
#
# * controller ...................... The Rails controller processing the HTTP request
# * convert_to_instance_variables ... Converts a Hash to instance variables
# * css_id_selector ................. Returns a CSS selector for an element `id` i.e. prefixes with `#`
# * dom_id .......................... The Rails dom_id helper
# * dom_id_selector ................. Returns a CSS selector for a dom_id
# * element ......................... A struct that represents the DOM element that triggered the command
# * morph ........................... Appends a Turbo Stream to morph a DOM element
# * params .......................... Commands specific params (frame_id, element, etc.)
# * render .......................... Renders Rails templates, partials, etc. (doesn't halt controller request handling)
# * renderer ........................ An ActionController::Renderer
# * state ........................... An object that stores ephemeral `state`
# * transfer_instance_variables ..... Transfers all instance variables to another object
# * turbo_stream .................... A Turbo Stream TagBuilder
# * turbo_streams ................... A list of Turbo Streams to append to the response (also aliased as streams)
#
# They also have access to the following class methods:
#
# * prevent_controller_action ... Prevents the rails controller/action from running (i.e. the command handles the response entirely)
#
class TurboBoost::Commands::Command
  include TurboBoost::Commands::CommandCallbacks

  class << self
    def css_id_selector(id)
      return id if id.to_s.start_with?("#")
      "##{id}"
    end

    def preventers
      @preventers ||= Set.new
    end

    def prevent_controller_action(options = {})
      preventers << options.with_indifferent_access
    end

    def should_prevent_controller_action?(command, method_name)
      method_name = method_name.to_s
      match = preventers.find do |options|
        only = options[:only] || []
        only = [only] unless only.is_a?(Array)
        only.map!(&:to_s)

        except = options[:except] || []
        except = [except] unless except.is_a?(Array)
        except.map!(&:to_s)

        options.blank? || only.include?(method_name) || (except.present? && except.exclude?(method_name))
      end

      return false if match.nil?

      if match[:if].present?
        case match[:if]
        when Symbol then command.public_send(match[:if])
        when Proc then command.instance_exec { match[:if].call command }
        end
      elsif match[:unless].present?
        case match[:unless]
        when Symbol then !command.public_send(match[:unless])
        when Proc then !(command.instance_exec { match[:unless].call(command) })
        end
      else
        true
      end
    end
  end

  attr_reader :controller, :state, :params, :turbo_streams
  alias_method :streams, :turbo_streams

  delegate :css_id_selector, to: :"self.class"
  delegate :dom_id, to: :"controller.view_context"

  def initialize(controller, state, params = {})
    @controller = controller
    @state = state
    @params = params
    @turbo_streams = Set.new
  end

  # Abstract method to resolve state (default noop), override in subclassed commands
  def resolve_state(state_collection)
  end

  # Abstract `perform` method, override in subclassed commands
  def perform
    raise NotImplementedError, "#{self.class.name} must implement the `perform` method!"
  end

  # Converts a Hash to instance variables
  def convert_to_instance_variables(hash = {})
    return unless hash.present?
    hash.each { |key, value| instance_variable_set :"@#{key}", value }
  end

  # Transfers all instance variables to another object
  def transfer_instance_variables(object)
    instance_variables.each do |name|
      object.instance_variable_set name, instance_variable_get(name)
    end
  end

  def dom_id_selector(...)
    css_id_selector dom_id(...)
  end

  # Same method signature as ActionView::Rendering#render (i.e. controller.view_context.render)
  # Great for rendering partials with short-hand syntax sugar → `render "/path/to/partial"`
  def render(options = {}, locals = {}, &block)
    return controller.view_context.render(options, locals, &block) unless options.is_a?(Hash)

    options = options.symbolize_keys

    ivars = options[:assigns]&.each_with_object({}) do |(key, value), memo|
      memo[key] = controller.instance_variable_get(:"@#{key}")
      controller.instance_variable_set :"@#{key}", value
    end

    controller.view_context.render(options.except(:assigns), locals, &block)
  ensure
    ivars&.each { |key, value| controller.instance_variable_set :"@#{key}", value }
  end

  def turbo_stream
    @turbo_stream ||= Turbo::Streams::TagBuilder.new(controller.view_context)
  end

  def morph(html:, id: nil, selector: nil)
    selector ||= css_id_selector(id)
    turbo_streams << turbo_stream.invoke("morph", args: [html], selector: selector)
  end

  def element
    @element ||= begin
      attributes = params[:element_attributes].to_h
      TurboBoost::Commands::AttributeSet.new(attributes.merge(
        aria: TurboBoost::Commands::AttributeSet.new(attributes, prefix: "aria"),
        data: TurboBoost::Commands::AttributeSet.new(attributes, prefix: "data")
      ))
    end
  end

  def should_prevent_controller_action?(method_name)
    self.class.should_prevent_controller_action? self, method_name
  end
end
