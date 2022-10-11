# frozen_string_literal: true

# Reflex instances have access to the following methods and properties.
#
# * controller .................. The Rails controller processing the HTTP request
# * element ..................... A struct that represents the DOM element that triggered the reflex
# * params ...................... Reflex specific params (frame_id, element, etc.)
# * render ...................... Renders Rails templates, partials, etc. (doesn't halt controller request handling)
# * renderer .................... An ActionController::Renderer
# * turbo_stream ................ A Turbo Stream TagBuilder
# * turbo_streams ............... A list of Turbo Streams to append to the response
#
class CounterReflex < TurboReflex::Base
  delegate :session, to: :controller

  # prevent the Rails controller/action from running
  # i.e. completely handle the response in the reflex
  prevent_controller_action

  def increment
    session[:count] = session.fetch(:count, 0) + 1
    turbo_streams << turbo_stream.replace("counter", partial: "app/views/demos/_counter")
  end
end
