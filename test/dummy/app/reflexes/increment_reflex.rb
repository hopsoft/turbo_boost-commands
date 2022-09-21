# frozen_string_literal: true

# Reflex instances have access to the following methods and properties.
#
# * controller ..... The Rails controller processing the HTTP request
# * element ........ A struct that represents the DOM element that triggered the reflex
# * turbo_stream ... A Turbo Stream TagBuilder
# * turbo_streams .. A list of Turbo Streams to append to the response
#
class IncrementReflex < TurboReflex::Base
  def increment
    controller.instance_variable_set :@count, element.data_count.to_i + 1
  end
end
