# frozen_string_literal: true

require "test_helper"
require "capybara-playwright-driver"

Capybara.default_max_wait_time = 8
Capybara.default_retry_interval = 0.2
Capybara.default_normalize_ws = true
Capybara.save_path = "tmp/capybara"

BROWSER = :chromium

Capybara.register_driver :playwright do |app|
  Capybara::Playwright::Driver.new(
    app,
    browser_type: BROWSER,
    headless: true,
    playwright_cli_executable_path: "npx playwright"
  )
end

Capybara.default_driver = :playwright
Capybara.javascript_driver = :playwright

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :playwright

  attr_reader :page

  def before_setup
    # User.destroy_all
    @playwright_exec = Playwright.create(playwright_cli_executable_path: "npx playwright")
    @playwright = @playwright_exec.playwright
    @browser = @playwright.public_send(BROWSER).launch
    @context = @browser.new_context # prepare new browser window
    @page = @context.new_page
    @page.set_default_timeout Capybara.default_max_wait_time * 1_000
  end

  def after_teardown
    @browser.close
    @playwright_exec.stop
  end

  # Wrapper for Playwright's page.evaluate method which evaluates
  # JavaScript code in the context of the current page.
  def js(...)
    @page.evaluate(...)
  end

  # Waits for a specific element to appear on the page.
  #
  # @param selector [String] A CSS selector
  # @return [Playwright::ElementHandle] The element
  def element(selector)
    parent = page.wait_for_selector(self.class::PARENT_SELECTOR) if defined?(self.class::PARENT_SELECTOR)
    parent ||= page
    parent.wait_for_selector selector
  end

  # Waits for an element to be detached from the DOM.
  #
  # @param element [Playwright::ElementHandle] The element
  # @param timeout [Integer] The maximum time to wait (default: 2s)
  # @param interval [Integer] The time interval to sleep between checks (default: 50ms)
  def wait_for_detach(element, timeout: 2.seconds, interval: 0.05)
    start = Time.now
    while page.evaluate("(element) => element.isConnected", arg: element)
      break if Time.now - start > timeout
      sleep interval
    end
  end
end
