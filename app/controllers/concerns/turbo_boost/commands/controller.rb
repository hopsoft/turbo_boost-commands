# frozen_string_literal: true

module TurboBoost::Commands::Controller
  extend ActiveSupport::Concern

  module ClassMethods
    def turbo_boost_state(&block)
      TurboBoost::State::Manager.add_state_override_block name, block
    end
  end

  included do
    before_action -> { turbo_boost.run }
    after_action -> { turbo_boost.update_response }
    helper_method :turbo_boost
  end

  def turbo_boost
    @turbo_boost ||= TurboBoost::Commands::ControllerPack.new(self)
  end
end
