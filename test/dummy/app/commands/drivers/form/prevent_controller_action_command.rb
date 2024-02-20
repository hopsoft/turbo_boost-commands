# frozen_string_literal: true

module Drivers
  module Form
    class PreventControllerActionCommand < ApplicationCommand
      prevent_controller_action

      def perform
        Current.template = "tests/drivers/_form.html.erb"
        count = state[self.class.name].to_i + 1
        state[self.class.name] = count

        render_response(
          html: render(partial: "/tests/drivers/form", assigns: {message: "#{self.class.name.demodulize} invoked #{count} times"}),
          status: :multiple_choices
        )
      end
    end
  end
end
