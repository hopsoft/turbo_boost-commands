# frozen_string_literal: true

class IncrementCountCommand < TurboBoost::Commands::Command
  def perform
    Current.user.increment! :count
  end
end
