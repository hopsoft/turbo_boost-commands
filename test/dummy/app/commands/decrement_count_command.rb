# frozen_string_literal: true

class DecrementCountCommand < ApplicationCommand
  def perform
    Current.user.decrement! :count
  end
end
