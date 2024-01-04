# frozen_string_literal: true

module TurboBoost::Commands
  class InvalidClassError < StandardError; end

  class InvalidMethodError < StandardError; end

  class InvalidElementError < StandardError; end

  class CommandError < StandardError
    def initialize(message, command:, http_status:, cause: nil)
      @cause = cause
      @command = command
      @http_status_code = TurboBoost::Commands.http_status_code(http_status)
      messages = [
        "HTTP #{http_status_code} #{TurboBoost::Commands::HTTP_STATUS_CODES[http_status_code]}",
        message,
        location
      ]
      super(messages.join("; ").strip)
    end

    attr_reader :cause, :command, :http_status_code

    def location
      line = (cause&.backtrace || []).first.to_s
      line.[](/[^\/]+\.rb:\d+/i)
    end
  end

  class AbortError < CommandError
    def initialize(message = "", **kwargs)
      default_message = "TurboBoost Command intentionally aborted via `throw` in a `[before,after,around]_command` lifecycle callback!"
      message = "#{default_message} #{message}".strip
      super(message, http_status: :abort_turbo_boost_command, **kwargs)
    end
  end

  class PerformError < CommandError
    def initialize(message = "Unexpected error in TurboBoost Command!", **kwargs)
      super(message, http_status: :unhandled_turbo_boost_command_error, **kwargs)
    end
  end
end
