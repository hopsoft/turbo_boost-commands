# frozen_string_literal: true

class ResetCountCommand < ApplicationCommand
  def perform
    Current.user.update count: 0
  end
end
