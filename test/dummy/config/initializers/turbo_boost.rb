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
# - protect_from_forgery, opt-(in/out) of command token validation (true)
# - apply_client_state_overrides, opt-(in/out) of client state overrides (false)
# - apply_server_state_overrides, opt-(in/out) of server state overrides (false)
# - precompile_assets, opt-(in/out) of precompiling assets (true)
#
TurboBoost::Commands.config.tap do |config|
  config.apply_client_state_overrides = false
  config.apply_server_state_overrides = false
end
