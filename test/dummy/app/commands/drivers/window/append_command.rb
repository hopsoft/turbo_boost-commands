# frozen_string_literal: true

module Drivers
  module Window
    class AppendCommand < ApplicationCommand
      prevent_controller_action

      def perform
        count = state["Drivers::Window::AppendCommand"].to_i + 1
        state["Drivers::Window::AppendCommand"] = count
        streams << render(
          partial: "/tests/drivers/window",
          formats: [:turbo_stream],
          assigns: {message: "AppendCommand invoked #{count} times"}
        )
      end
    end
  end
end
