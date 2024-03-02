# frozen_string_literal: true

module Drivers
  module Window
    class AllowControllerActionCommand < ApplicationCommand
      after_command -> { transfer_instance_variables controller }

      def perform
        count = state[self.class.name].to_i + 1
        state[self.class.name] = count
        @message = "#{self.class.name.demodulize} invoked #{count} times"
      end

      before_command -> { throw :abort }, only: :perform_with_abort
      def perform_with_abort
      end

      def perform_with_error
        raise NotImplementedError
      end
    end
  end
end
