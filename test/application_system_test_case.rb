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
Capybara.default_max_wait_time = 10
Capybara.default_normalize_ws = true
Capybara.save_path = "tmp/capybara"
Capybara.configure do |config|
  config.server = :puma, {Silent: true}
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :null

  def self.playwright
    @playwright ||= Playwright.create(playwright_cli_executable_path: Rails.root.join("../../node_modules/.bin/playwright"))
  end

  alias_method :orig_page, :page
  attr_reader :playwright_browser, :playwright_page
  alias_method :page, :playwright_page

  def js(...)
    page.evaluate(...)
  end

  def wait_for_turbo_stream(attrs = {})
    page.wait_for_selector("turbo-stream#{attrs.map { |(k, v)| "[#{k}='#{v}']" }.join}", state: "attached")
  end

  def before_setup
    super
    base_url = Capybara.current_session.server.base_url
    @playwright_browser = self.class.playwright.playwright.chromium.launch(headless: true)
    @playwright_page = @playwright_browser.new_page(baseURL: base_url)
  end

  def after_teardown
    super
    playwright_browser&.close
  end
end
