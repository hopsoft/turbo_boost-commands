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
    # migrations_dir = File.expand_path("dummy/db/migrate", __dir__)
    # ActiveRecord::MigrationContext.new(migrations_dir).migrate
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

  # Returns an element that matches the given testid attribute value.
  #
  # @param testid [String,Symbol] The element's data-testid attribute value
  # @return [Playwright::ElementHandle] The element
  def element(testid)
    page.get_by_test_id testid.to_s
  end

  # Waits for an element to be mutated (i.e. have its attributes or children changed).
  # SEE: test/dummy/app/javascript/tests/index.js
  #
  # @param testid [String,Symbol] The element's data-testid attribute value
  # @param timeout [Integer] The maximum time to wait (default: 5s)
  # @param interval [Integer] The time interval to sleep between checks (default: 100ms)
  # @param reset [Boolean] Whether to also wait for the mutation tracking to reset (default: true)
  def wait_for_mutations(testid, timeout: 5.seconds, interval: 0.1, reset: true)
    Timeout.timeout timeout.to_i do
      while js("element => !element.mutations", arg: element(testid).element_handle)
        sleep interval.to_f
      end
    end
    wait_for_mutations_reset testid if reset
  end

  # Waits for an element's mutation tracking to reset.
  # SEE: test/dummy/app/javascript/tests/index.js
  #
  # @param testid [String,Symbol] The element's data-testid attribute value
  # @param timeout [Integer] The maximum time to wait (default: 5s)
  # @param interval [Integer] The time interval to sleep between checks (default: 100ms)
  def wait_for_mutations_reset(testid, timeout: 5.seconds, interval: 0.1)
    Timeout.timeout timeout.to_i do
      while js("element => element.mutations", arg: element(testid).element_handle)
        sleep interval.to_f
      end
    end
  end

  # Waits for an element to be detached from the DOM.
  #
  # @param element [Playwright::ElementHandle] The element
  # @param timeout [Integer] The maximum time to wait (default: 5s)
  # @param interval [Integer] The time interval to sleep between checks (default: 100ms)
  def wait_for_detach(element, timeout: 5.seconds, interval: 0.1)
    Timeout.timeout timeout.to_i do
      while page.evaluate("(element) => element.isConnected", arg: element)
        sleep interval.to_f
      end
    end
  end

  def wait_for_turbo_boost(testid, timeout: 5.seconds, interval: 0.1, reset: true)
    Timeout.timeout timeout.to_i do
      while js("element => !element.hasAttribute('data-turbo-boost')", arg: element(testid).element_handle)
        sleep interval.to_f
      end
    end
    wait_for_turbo_boost_reset testid if reset
  end

  def wait_for_turbo_boost_reset(testid, timeout: 5.seconds, interval: 0.1)
    Timeout.timeout timeout.to_i do
      while js("element => element.hasAttribute('data-turbo-boost')", arg: element(testid).element_handle)
        sleep interval.to_f
      end
    end
  end
end
