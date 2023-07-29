# frozen_string_literal: true

class ResetCountCommand < TurboBoost::Commands::Command
  def perform
    Current.user.update count: 0
  end
end
