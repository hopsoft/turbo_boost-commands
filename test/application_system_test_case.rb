# frozen_string_literal: true

require "test_helper"
require "capybara-playwright-driver"

class CapybaraNullDriver < Capybara::Driver::Base
  def needs_server?
    true
  end
end

Capybara.register_driver(:null) { CapybaraNullDriver.new }
Capybara.default_driver = :null
Capybara.default_max_wait_time = 12
Capybara.default_normalize_ws = true
Capybara.save_path = "tmp/capybara"
Capybara.configure do |config|
  config.server = :puma, {Silent: true}
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :null

  def self.playwright
    @playwright ||= Playwright.create(playwright_cli_executable_path: `which playwright`.strip)
  end

  alias_method :orig_page, :page
  attr_reader :playwright_browser, :playwright_page
  alias_method :page, :playwright_page

  def js(...)
    page.evaluate(...)
  end

  def before_setup
    super
    base_url = Capybara.current_session.server.base_url
    @playwright_browser = self.class.playwright.playwright.chromium.launch(headless: true)
    @playwright_page = @playwright_browser.new_page(baseURL: base_url)
    playwright_page.set_default_timeout Capybara.default_max_wait_time * 1_000
  end

  def after_teardown
    super
    playwright_browser&.close
  end
end
