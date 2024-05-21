# frozen_string_literal: true

module TurboBoost::Commands::Controller
  extend ActiveSupport::Concern

  included do
    before_action -> { turbo_boost.runner.run }
    after_action -> { turbo_boost.runner.flush }
    helper_method :turbo_boost
  end

  def turbo_boost
    @turbo_boost ||= TurboBoost::Commands::ControllerPack.new(self)
  end
end
