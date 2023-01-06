# frozen_string_literal: true

# TurboBoost::Commands::Command superclass.
# All command classes should inherit from this class.
#
# Commands are executed via a before_action in the Rails controller lifecycle.
# They have access to the following methods and properties.
#
# * controller .................................. The Rails controller processing the HTTP request
# * convert_to_instance_variables ............... Converts a Hash to instance variables
# * css_id_selector ............................. Returns a CSS selector for an element `id` i.e. prefixes with `#`
# * dom_id ...................................... The Rails dom_id helper
# * dom_id_selector ............................. Returns a CSS selector for a dom_id
# * element ..................................... A struct that represents the DOM element that triggered the command
# * morph ....................................... Appends a Turbo Stream to morph a DOM element
# * params ...................................... Commands specific params (frame_id, element, etc.)
# * render ...................................... Renders Rails templates, partials, etc. (doesn't halt controller request handling)
# * renderer .................................... An ActionController::Renderer
# * state ....................................... An object that stores ephemeral `state`
# * transfer_instance_variables_to_controller ... Transfers all instance variables to the controller
# * turbo_stream ................................ A Turbo Stream TagBuilder
# * turbo_streams ............................... A list of Turbo Streams to append to the response (also aliased as streams)
#
# They also have access to the following class methods:
#
# * prevent_controller_action ... Prevents the rails controller/action from running (i.e. the command handles the response entirely)
#
class CounterCommand < TurboBoost::Commands::Command
  delegate :session, to: :controller

  # prevent the Rails controller/action from running
  # i.e. completely handle the response in the command
  prevent_controller_action

  def increment
    session[:count] = session.fetch(:count, 0) + 1
    turbo_streams << turbo_stream.replace("counter", partial: "demos/counter")
  end
end
