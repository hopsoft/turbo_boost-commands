# frozen_string_literal: true

class IncrementCountCommand < ApplicationCommand
  def perform
    Current.user.increment! :count
  end
end
