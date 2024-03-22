# frozen_string_literal: true

module Drivers
  module Frame
    class PreventControllerActionCommand < ApplicationCommand
      prevent_controller_action

      def perform
        Current.template = "tests/drivers/frame/_turbo_stream.html.erb"

        # store count in the state
        key = "#{self.class.name}/count"
        state.signed[key] = state.signed[key].to_i + 1

        streams << render(
          partial: "/tests/drivers/frame",
          formats: [:turbo_stream],
          assigns: {message: "#{self.class.name.demodulize} invoked #{state.signed[key]} times"}
        )
      end
    end
  end
end
