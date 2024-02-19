# frozen_string_literal: true

module Drivers
  module Window
    class ReplaceCommand < ApplicationCommand
      after_command -> { transfer_instance_variables controller }

      def perform
        count = state["Drivers::Window::ReplaceCommand"].to_i + 1
        state["Drivers::Window::ReplaceCommand"] = count
        @message = "ReplaceCommand invoked #{count} times"
      end
    end
  end
end
