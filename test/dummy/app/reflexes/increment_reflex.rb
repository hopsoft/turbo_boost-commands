# frozen_string_literal: true

class IncrementReflex < TurboReflex::Reflex
  def increment
    controller.instance_variable_set :@value, element.value.to_i + 1
  end
end
