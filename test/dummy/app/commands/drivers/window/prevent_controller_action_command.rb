# frozen_string_literal: true

module Drivers
  module Window
    class PreventControllerActionCommand < ApplicationCommand
      prevent_controller_action

      def perform
        count = state["Drivers::Window::PreventControllerActionCommand"].to_i + 1
        state["Drivers::Window::PreventControllerActionCommand"] = count
        streams << render(
          partial: "/tests/drivers/window",
          formats: [:turbo_stream],
          assigns: {message: "PreventControllerActionCommand invoked #{count} times"}
        )
      end
    end
  end
end
