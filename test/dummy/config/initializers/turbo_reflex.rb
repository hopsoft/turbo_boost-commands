# frozen_string_literal: true

# Configuration can be accessed multiple ways.
# All options return the same configuration object.
#
# - TurboReflex.config
# - Rails.application.config.turbo_reflex
#
# Options:
# - max_cookie_size - Max size for the state management cookie in bytes (ActionDispatch::Cookies::MAX_COOKIE_SIZE / 2)
# - validate_client_token - Whether or not to validate the client token when invoking reflexes (true)
#
TurboReflex.config.tap do |config|
  # NOTE: We're being extra cautious with cookie size by targeting a max of 4 kilobytes for ALL cookies across the domain.
  # SEE: http://browsercookielimits.iain.guru/
  # SEE: https://stackoverflow.com/questions/52203972/maximum-cookie-size-of-current-browsers-year-2018
  config.max_cookie_size = 1.kilobyte
  config.validate_client_token = true
end
