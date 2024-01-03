# frozen_string_literal: true

module TurboBoost::Commands
  class InvalidClassError < StandardError; end

  class InvalidMethodError < StandardError; end

  class InvalidElementError < StandardError; end

  class AbortError < StandardError
    attr_reader :cause

    def initialize(message = "Command aborted by a callback!", handler:, cause: nil)
      super(message)
      @handler = handler
      @cause = cause
    end

    def location
      path, line = @handler&.source_location || []
      "#{path.split("/").last}:#{line}"
    end
  end
end
