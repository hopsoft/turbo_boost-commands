# frozen_string_literal: true

# Reflex instances have access to the following methods and properties.
#
# * controller - the Rails controller processing the HTTP request
# * element - a struct that represents the DOM element that triggered the reflex
# * turbo_stream - a Turbo Stream TagBuilder
# * turbo_streams - a list of Turbo Streams to append to the response
#
class IncrementReflex < TurboReflex::Base
  def increment
    controller.instance_variable_set :@count, element.data_count.to_i + 1
  end
end
