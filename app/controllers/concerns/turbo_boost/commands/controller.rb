# frozen_string_literal: true

module TurboBoost::Commands::Controller
  extend ActiveSupport::Concern

  module ClassMethods
    def turbo_boost_state(&block)
      TurboBoost::Commands::StateManager.add_state_override_block name, block
    end
  end

  included do
    before_action -> { turbo_boost_command.run }
    after_action -> { turbo_boost_command.update_response }
    helper_method :turbo_boost_command
  end

  def turbo_boost_command
    @turbo_boost_command ||= TurboBoost::Commands::ControllerPack.new(self)
  end
end
