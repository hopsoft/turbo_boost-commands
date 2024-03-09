# frozen_string_literal: true

module Drivers
  module Method
    class AllowControllerActionCommand < ApplicationCommand
      after_command -> { transfer_instance_variables controller }

      def perform
        count = state[:count].to_i + 1
        state[:count] = count
        @message = "#{self.class.name.demodulize} invoked #{count} times"
      end
    end
  end
end
