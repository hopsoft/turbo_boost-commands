# frozen_string_literal: true

require "test_helper"
require "capybara/cuprite"

# Capybara setup fom Evil Martians
# SEE: https://evilmartians.com/chronicles/system-of-a-test-setting-up-end-to-end-rails-testing
# NOTE: Will need to set this up for multiple sessions
Capybara.default_max_wait_time = 2
Capybara.default_normalize_ws = true
# Capybara.save_path = ENV.fetch("CAPYBARA_ARTIFACTS", "./tmp/capybara")

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :cuprite, using: :headless_chrome, screen_size: [1400, 1400]
end

Capybara.configure do |config|
  config.server = :puma, {Silent: true}
end
