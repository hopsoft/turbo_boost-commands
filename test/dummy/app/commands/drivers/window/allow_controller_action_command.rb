# frozen_string_literal: true

module Drivers
  module Window
    class AllowControllerActionCommand < ApplicationCommand
      after_command -> { transfer_instance_variables controller }

      def perform
        count = state["Drivers::Window::AllowControllerActionCommand"].to_i + 1
        state["Drivers::Window::AllowControllerActionCommand"] = count
        @message = "AllowControllerActionCommand invoked #{count} times"
      end
    end
  end
end
