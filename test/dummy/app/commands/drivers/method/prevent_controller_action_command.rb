# frozen_string_literal: true

module Drivers
  module Method
    class PreventControllerActionCommand < ApplicationCommand
      prevent_controller_action

      def perform
        Current.template = "tests/drivers/_method.html.erb"
        count = state[self.class.name].to_i + 1
        state[self.class.name] = count

        streams << render(
          partial: "/tests/drivers/method",
          formats: [:turbo_stream],
          assigns: {message: "#{self.class.name.demodulize} invoked #{count} times"}
        )
      end
    end
  end
end
