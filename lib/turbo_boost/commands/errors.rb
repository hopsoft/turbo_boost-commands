# frozen_string_literal: true

module TurboBoost::Commands
  class InvalidClassError < StandardError; end

  class InvalidMethodError < StandardError; end

  class InvalidElementError < StandardError; end

  class CommandError < StandardError
    attr_reader :cause, :command

    def initialize(message, command:, cause: nil)
      super(message)
      @command = command
      @cause = cause
    end
  end

  class AbortError < CommandError
    def initialize(message = "Command aborted by a callback!", **kwargs)
      super
    end
  end

  class PerformError < CommandError
    def initialize(message = "Unexpected error in Command!", **kwargs)
      super
    end
  end
end
