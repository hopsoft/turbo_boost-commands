# frozen_string_literal: true

class ApplicationCommand < TurboBoost::Commands::Command
  # Abort a command from a before callback by invoking `throw :abort`
  # before_command { throw :abort }

  # NOTE: Callbacks use throw/catch to manage control flow which means
  #       this is not a real error per se, but you can intercept with rescue_from
  rescue_from TurboBoost::Commands::AbortError do |error|
    # do something...
  end

  # Setup an error handler with `on_error`
  rescue_from TurboBoost::Commands::PerformError do |error|
    # do something...
  end
end
