# frozen_string_literal: true

module TurboBoost::Commands
  class InvalidClassError < StandardError; end

  class InvalidMethodError < StandardError; end

  class InvalidElementError < StandardError; end

  class AbortError < StandardError
    attr_reader :cause, :command

    def initialize(message = "Command aborted by a callback!", command:, cause: nil)
      super(message)
      @command = command
      @cause = cause
    end
  end
end
