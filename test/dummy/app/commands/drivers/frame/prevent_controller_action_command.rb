# frozen_string_literal: true

module Drivers
  module Frame
    class PreventControllerActionCommand < ApplicationCommand
      prevent_controller_action

      def perform
        count = state["Drivers::Frame::PreventControllerActionCommand"].to_i + 1
        state["Drivers::Frame::PreventControllerActionCommand"] = count
        streams << render(
          partial: "/tests/drivers/frame",
          formats: [:turbo_stream],
          assigns: {message: "PreventControllerActionCommand invoked #{count} times"}
        )
      end
    end
  end
end
