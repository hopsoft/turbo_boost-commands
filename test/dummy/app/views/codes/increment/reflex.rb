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
class CounterReflex < TurboReflex::Base
  delegate :session, to: :controller

  # triggered client-side by elements with `data-turbo-reflex="CounterReflex#increment"`
  # performed server-side by an implicit controller before_action
  def increment
    # update the state held in sesion
    session[:count] = session.fetch(:count, 0) + 1
  end
end
