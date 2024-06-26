# frozen_string_literal: true

# NOTE: this line is only required by the test/dummy app, regular apps will not need this
require "turbo_boost/streams"

# Configuration can be accessed multiple ways.
# All options return the same configuration object.
#
# - TurboBoost::Commands.config
# - Rails.application.config.turbo_boost_commands
#
# Options:
# - alert_on_abort, opt-(in/out) of alerting on abort (true, *false, "development", "test", "production")
# - alert_on_error, opt-(in/out) of alerting on error (true, *false, "development", "test", "production")
# - precompile_assets, opt-(in/out) of precompiling assets (*true, false)
# - protect_from_forgery, opt-(in/out) of forgery protection (*true, false)
# - raise_on_invalid_command, opt-(in/out) of raising an error if invalid command requested (true, false, *"development", "test", "production")
# - resolve_state, opt-(in/out) of state resolution (true, *false)
# - verify_client, opt-(in/out) of verifying the client browser (*true, false)
#
TurboBoost::Commands.config.tap do |config|
  config.alert_on_abort = "development"
  config.alert_on_error = "development"
  config.precompile_assets = true
  config.protect_from_forgery = true
  config.raise_on_invalid_command = "development"
  config.resolve_state = false
  config.verify_client = true
end
