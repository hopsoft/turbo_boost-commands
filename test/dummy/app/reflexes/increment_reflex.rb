# frozen_string_literal: true

class IncrementReflex < TurboReflex::Base
  def increment
    controller.instance_variable_set :@value, element.data_value.to_i + 1
  end

  def form_increment
    controller.instance_variable_set :@value, element.data_value.to_i + 1
    turbo_streams << turbo_stream.invoke("console.log", args: ["You submitted the increment form! #{SecureRandom.alphanumeric(8)}"])
  end
end
