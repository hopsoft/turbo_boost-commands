# frozen_string_literal: true

module Drivers
  module Method
    class PreventControllerActionCommand < ApplicationCommand
      prevent_controller_action

      def perform
        Current.template = "tests/drivers/method/_turbo_stream.html.erb"
        count = state[self.class.name].to_i + 1
        state[self.class.name] = count

        # TODO: Assign the desired HTML to body and let the runner render
        # TODO: Wire up AllowControllerActionCommand
        # TODO: Add tests for method driver
        # controller.render html: render("/tests/drivers/method", assigns: {message: "#{self.class.name.demodulize} invoked #{count} times"}), status: :multiple_choices
      end
    end
  end
end
