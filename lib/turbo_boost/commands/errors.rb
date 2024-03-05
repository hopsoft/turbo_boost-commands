# frozen_string_literal: true

module TurboBoost::Commands
  class InvalidClassError < StandardError; end

  class InvalidMethodError < StandardError; end

  class InvalidElementError < StandardError; end

  class CommandError < StandardError
    def initialize(*messages, command:, http_status:, cause: nil)
      @cause = cause
      @command = command
      @http_status_code = TurboBoost::Commands.http_status_code(http_status)

      messages.prepend "HTTP #{http_status_code} #{TurboBoost::Commands::HTTP_STATUS_CODES[http_status_code]}"
      messages << cause.message if cause
      messages << location

      super(messages.uniq.select(&:present?).join("; "))
    end

    attr_reader :cause, :command, :http_status_code

    def location
      line = (cause&.backtrace || []).first.to_s
      line.[](/[^\/]+\.rb:\d+/i)
    end
  end

  class AbortError < CommandError
    def initialize(*messages, **kwargs)
      messages.prepend "TurboBoost Command intentionally aborted via `throw` in a `[before,after,around]_command` lifecycle callback!"
      super(messages, http_status: :abort_turbo_boost_command, **kwargs)
    end
  end

  class PerformError < CommandError
    def initialize(*messages, **kwargs)
      messages.prepend "Unexpected error encountered while performing a TurboBoost Command!"
      super(messages, http_status: :internal_server_error, **kwargs)
    end
  end
end
