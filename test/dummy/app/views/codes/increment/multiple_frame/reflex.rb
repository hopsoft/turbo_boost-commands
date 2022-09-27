# frozen_string_literal: true

# Reflex instances have access to the following methods and properties.
#
# * controller ..... The Rails controller processing the HTTP request
# * element ........ A struct that represents the DOM element that triggered the reflex
# * turbo_stream ... A Turbo Stream TagBuilder
# * turbo_streams .. A list of Turbo Streams to append to the response
#
class IncrementReflex < TurboReflex::Base
  delegate :session, to: :controller

  def increment
    key = "frame-#{element.data_id}-count"
    session[key] = session.fetch(key, 0) + 1
  end
end
