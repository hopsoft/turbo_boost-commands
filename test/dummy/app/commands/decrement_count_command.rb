# frozen_string_literal: true

class DecrementCountCommand < TurboBoost::Commands::Command
  def perform
    Current.user.decrement! :count
  end
end
