# frozen_string_literal: true

class IncrementReflex < TurboReflex::Base
  def increment
    controller.instance_variable_set :@value, element.data_value.to_i + 1
  end
end
