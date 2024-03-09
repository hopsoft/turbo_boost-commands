# frozen_string_literal: true

module Drivers
  module Window
    class PreventControllerActionCommand < ApplicationCommand
      prevent_controller_action

      def perform
        Current.template = "tests/drivers/window/_turbo_stream.html.erb"
        count = state[:count].to_i + 1
        state[:count] = count
        streams << render(partial: "/tests/drivers/window", formats: [:turbo_stream],
          assigns: {message: "#{self.class.name.demodulize} invoked #{count} times"})
      end
    end
  end
end
