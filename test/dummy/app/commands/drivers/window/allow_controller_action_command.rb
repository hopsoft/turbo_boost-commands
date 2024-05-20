# frozen_string_literal: true

module Drivers
  module Window
    class AllowControllerActionCommand < ApplicationCommand
      before_command -> { throw :abort }, only: :perform_with_abort
      after_command -> { transfer_instance_variables controller }

      def perform
        # store count in the state
        key = "#{self.class.name}/count"
        state[key] = state[key].to_i + 1

        @message = "#{self.class.name.demodulize} invoked #{state[key]} times"
      end

      before_command -> { throw :abort }, only: :perform_with_abort
      def perform_with_abort
      end

      def perform_with_error
        raise NotImplementedError, "Intentional error for testing!"
      end
    end
  end
end
