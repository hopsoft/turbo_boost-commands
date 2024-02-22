# frozen_string_literal: true

require "test_helper"
require "capybara-playwright-driver"

Capybara.default_max_wait_time = 8
Capybara.default_retry_interval = 0.2
Capybara.default_normalize_ws = true
Capybara.save_path = "tmp/capybara"

Capybara.register_driver :playwright do |app|
  Capybara::Playwright::Driver.new(app,
    browser_type: :chromium,
    headless: true,
    playwright_cli_executable_path: Rails.root.join("../../node_modules/.bin/playwright"))
end

Capybara.default_driver = :playwright
Capybara.javascript_driver = :playwright

Capybara.configure do |config|
  config.ignore_hidden_elements = false
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :playwright

  alias_method :capybara_page, :page

  def with_playwright_page
    Capybara.current_session.driver.with_playwright_page do |page|
      page.set_default_timeout Capybara.default_max_wait_time * 1_000
      yield page
    end
  end

  def js(...)
    with_playwright_page do |page|
      page.evaluate(...)
    end
  end
end
