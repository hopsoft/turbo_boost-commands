# frozen_string_literal: true

module Drivers
  module Method
    class PreventControllerActionCommand < ApplicationCommand
      prevent_controller_action

      def perform
        Current.template = "tests/drivers/_method.html.erb"

        # store count in the state
        key = "#{self.class.name}/count"
        state[key] = state[key].to_i + 1

        streams << render(
          partial: "/tests/drivers/method",
          formats: [:turbo_stream],
          assigns: {message: "#{self.class.name.demodulize} invoked #{state[key]} times"}
        )
      end
    end
  end
end
