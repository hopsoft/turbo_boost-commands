# frozen_string_literal: true

class ApplicationCommand < TurboBoost::Commands::Command
  # Abort a command from a before callback by invoking `throw :abort`
  # before_command -> { throw :abort }

  # Setup an abort handler with `on_abort`
  # on_abort -> { log the abort... }

  # You can also override abort_handler instead of using `on_abort`
  # def abort_handler
  #   log the abort...
  # end

  # Setup an error handler with `on_error`
  # on_error { |error| Honeybadger.notify error }

  # You can also override error_handler instead of using `on_error`
  # def error_handler(error)
  #   Honeybadger.notify error
  # end
end
