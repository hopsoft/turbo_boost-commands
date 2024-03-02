# frozen_string_literal: true

module Drivers
  module Window
    class RaiseControllerActionCommand < ApplicationCommand
      def perform
        raise NotImplementedError, "TurboBoost::Command not implemented"
      end
    end
  end
end
