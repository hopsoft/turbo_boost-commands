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
  # Driver customization options: https://github.com/rubycdp/ferrum#customization
  driven_by :cuprite, screen_size: [1400, 1400],
    options: {
      headless: true, # set to false to view tests run browser (set slowmo)
      js_errors: true,
      pending_connection_errors: false,
      # slowmo: 0.05, # seconds to wait before sending command
      timeout: 10
    }

  def abort_asset_requets
    page.driver.browser.on(:request) do |request|
      binding.pry
      if request.match?(/\.png|\.jpg|\.jpeg|\.svg|\.woff2|\.css/)
        puts "Aborting request " + request.url.to_s
        request.abort
      else
        puts "Continue with " + request.url.to_s
        request.continue
      end
    end
  end
end

Capybara.configure do |config|
  config.server = :puma, {Silent: true}
end
