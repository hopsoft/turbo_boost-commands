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
class CounterReflex < TurboReflex::Base
  delegate :session, to: :controller

  def increment
    key = "frame-#{controller.params[:id]}-count"
    session[key] = session.fetch(key, 0) + 1
  end
end
