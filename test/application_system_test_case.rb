# frozen_string_literal: true

require "test_helper"
require "capybara-playwright-driver"

class CapybaraNullDriver < Capybara::Driver::Base
  def needs_server?
    true
  end
end

Capybara.default_max_wait_time = 8
Capybara.default_retry_interval = 0.2
Capybara.default_normalize_ws = true
Capybara.save_path = "tmp/capybara"

Capybara.register_driver :playwright do |app|
  Capybara::Playwright::Driver.new(app, browser_type: :chromium)
end

Capybara.default_driver = :playwright

Capybara.configure do |config|
  config.ignore_hidden_elements = false
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :playwright

  def self.playwright
    @playwright ||= Playwright.create(playwright_cli_executable_path: Rails.root.join("../../node_modules/.bin/playwright"))
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

  def with_retries(max = 5)
    count = 0
    while count < max
      begin
        count += 1
        return yield
      rescue Playwright::Error, Minitest::Assertion => error
        puts "RETRY #{count}: #{self.class.name}##{name} → #{error.message}"
        sleep count * 3
        # Capybara.reset_sessions!
        page.reload waitUntil: "load"
        raise if count >= max
      end
    end
  end

  # Waits for a promise to resolve on the client
  def wait_for_promise(delay: 0)
    page.evaluate("new Promise(resolve => setTimeout(resolve, #{delay}))")
  end

  # Waits for the next tick in the JavaScript event loop
  def wait_for_next_tick
    wait_for_promise
  end

  # If a TurboStream replaces an element in the DOM,
  # we may need to wait for the element to be detached from the DOM before proceeding.
  #
  # NOTE: Playwright's `wait_for_element_state` doesn't accept "detached" as a valid state for some reason.
  #       Not sure why because `state: "detached"` is valid on `wait_for_selector` | ಠ_ಠ
  #
  # NOTE: This isn't as reliable as I had hoped
  def wait_for_detach(element)
    # 1. STRATEGY: Wait for detach/hidden state + next tick
    element.wait_for_element_state "hidden"
    wait_for_next_tick

    # 2. STRATEGY: Wait for 100ms
    # wait_for_promise delay: 100
  end
end
