# frozen_string_literal: true

module Drivers
  module Method
    class AllowControllerActionCommand < ApplicationCommand
      after_command -> { transfer_instance_variables controller }

      def perform
        # store count in the state
        key = "#{self.class.name}/count"
        state[key] = state[key].to_i + 1

        @message = "#{self.class.name.demodulize} invoked #{state[key]} times"
      end
    end
  end
end
