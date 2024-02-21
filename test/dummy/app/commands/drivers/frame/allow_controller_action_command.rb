# frozen_string_literal: true

module Drivers
  module Frame
    class AllowControllerActionCommand < ApplicationCommand
      after_command -> { transfer_instance_variables controller }

      def perform
        count = state[self.class.name].to_i + 1
        state[self.class.name] = count
        @message = "#{self.class.name.demodulize} invoked #{count} times"
      end
    end
  end
end
