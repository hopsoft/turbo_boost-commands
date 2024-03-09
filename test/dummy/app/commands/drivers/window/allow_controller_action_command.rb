# frozen_string_literal: true

module Drivers
  module Window
    class AllowControllerActionCommand < ApplicationCommand
      after_command -> { transfer_instance_variables controller }

      def perform
        count = state[:count].to_i + 1
        state[:count] = count
        @message = "#{self.class.name.demodulize} invoked #{count} times"
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
