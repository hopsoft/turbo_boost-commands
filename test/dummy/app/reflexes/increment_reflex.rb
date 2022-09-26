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
    self.count += 1
  end

  private

  def count
    session[element.data_session_key] ||= 0
  end

  def count=(value)
    session[element.data_session_key] = value
  end
end
