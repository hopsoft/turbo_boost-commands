# frozen_string_literal: true

# TurboReflex base superclass.
# All TurboReflex classes should inherit from this class.
#
# Reflexes are executed via a before_action in the Rails controller lifecycle.
# They have access to the following methods and properties.
#
# * dom_id ....................... The Rails dom_id helper
# * dom_id_selector .............. Returns a CSS selector for a dom_id
# * controller ................... The Rails controller processing the HTTP request
# * element ...................... A struct that represents the DOM element that triggered the reflex
# * params ....................... Reflex specific params (frame_id, element, etc.)
# * render ....................... Renders Rails templates, partials, etc. (doesn't halt controller request handling)
# * render_response .............. Renders a full controller response
# * renderer ..................... An ActionController::Renderer
# * prevent_controller_action .... Prevents the rails controller/action from running (i.e. the reflex handles the response entirely)
# * turbo_stream ................. A Turbo Stream TagBuilder
# * turbo_streams ................ A list of Turbo Streams to append to the response (also aliased as streams)
# * ui_state ..................... An object that stores ephemeral UI state
#
class CounterReflex < TurboReflex::Base
  delegate :session, to: :controller

  def increment
    key = "frame-#{controller.params[:id]}-count"
    session[key] = session.fetch(key, 0) + 1
  end
end
