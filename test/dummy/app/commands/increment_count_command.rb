# frozen_string_literal: true

class IncrementCountCommand < ApplicationCommand
  def perform
    Current.user.increment! :count
    controller.instance_variable_set(:@extra_data, "incremented")
  end
end
