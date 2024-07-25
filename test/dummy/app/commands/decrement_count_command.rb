# frozen_string_literal: true

class DecrementCountCommand < ApplicationCommand
  def perform
    Current.user.decrement! :count
    controller.instance_variable_set(:@extra_data, "decremented")
  end
end
