# frozen_string_literal: true

class IncrementReflex < TurboReflex::Base
  def increment
    controller.instance_variable_set :@count, element.data_count.to_i + 1
  end

  def decrement
    controller.instance_variable_set :@count, element.data_count.to_i - 1
  end
end
