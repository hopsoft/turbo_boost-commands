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
    @context = @browser.new_context(
      bypassCSP: true,
      ignoreHTTPSErrors: true
    )
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

  # Checks if an element is tracking active mutations.
  # SEE: test/dummy/app/javascript/tests/index.js
  #
  # @param testid [String] the element's testid
  # @return [Boolean] returns whether or not the element has active mutations
  def element_mutated?(testid)
    js "element => !!element.mutations", arg: element(testid).element_handle
  end

  # Waits for an element's mutation tracking to reset, then yields the element handle
  # and waits fo the element to be mutated again.
  # SEE: test/dummy/app/javascript/tests/index.js
  #
  # @param testid [String,Symbol] The element's data-testid attribute value
  # @param timeout [Integer] The maximum time to wait (default: 5s)
  # @param interval [Integer] The time interval to wait between checks (default: 20ms)
  def wait_for_mutations(testid, timeout: 5.seconds, interval: 0.02)
    wait_for_mutations_finished testid, timeout: timeout, interval: interval
    sleep 0.1 # TODO: figure out why this is needed
    Timeout.timeout timeout.to_i do
      sleep interval.to_f until element_mutated?(testid)
    end
    yield element(testid).element_handle if block_given?
  rescue Timeout::Error
    sleep 0.5 # last ditch effort to avoid flakiness
    yield element(testid).element_handle if block_given?
  end

  # Waits for an element's mutation tracking to reset, then yields the element handle.
  # SEE: test/dummy/app/javascript/tests/index.js
  #
  # @param testid [String,Symbol] The element's data-testid attribute value
  # @param timeout [Integer] The maximum time to wait (default: 5s)
  # @param interval [Integer] The time interval to wait between checks (default: 20ms)
  def wait_for_mutations_finished(testid, timeout: 5.seconds, interval: 0.02)
    sleep 0.1 # TODO: figure out why this is needed
    Timeout.timeout timeout.to_i do
      sleep interval.to_f while element_mutated?(testid)
    end
    yield element(testid).element_handle if block_given?
  rescue Timeout::Error
    sleep 0.5 # last ditch effort to avoid flakiness
    yield element(testid).element_handle if block_given?
  end

  # TODO: Update to use testid
  # Waits for an element to be detached from the DOM.
  #
  # @param element [Playwright::ElementHandle] The element
  # @param timeout [Integer] The maximum time to wait (default: 5s)
  # @param interval [Integer] The time interval to wait between checks (default: 20ms)
  def wait_for_detach(element, timeout: 5.seconds, interval: 0.02)
    Timeout.timeout timeout.to_i do
      sleep interval.to_f while page.evaluate("(element) => element.isConnected", arg: element)
    end
  rescue Timeout::Error
    sleep 0.5 # last ditch effort to avoid flakiness
  end

  # Asserts that a certain number of console messages are logged within a specified timeout period.
  #
  # @param min [Integer] The minimum number of console messages expected (default: 1)
  # @param type [String, nil] The type expected messages (log, debug, info, warning, error, default: nil)
  # @param pattern [Regexp, nil] A regular expression pattern that the console messages should match (default: nil)
  # @param timeout [ActiveSupport::Duration] The maximum amount of time to wait (default: 5s)
  # @param interval [Integer] The time interval to wait between checks (default: 20ms)
  # @yield Code to execute that triggers the console messages
  # @raise [Minitest::Assertion] The failed assertion if the conditions aren't satisfied
  def assert_console_messages(min: 1, type: nil, pattern: nil, timeout: 5.seconds, interval: 0.02)
    js "TurboBoost.Commands.logger.level = 'debug'"
    messages = []
    page.on "console", ->(msg) do
      msg = nil unless type.nil? || msg&.type == type
      msg = nil unless pattern.nil? || msg&.text&.match?(pattern)
      messages << msg.text if msg
    end
    yield if block_given?
    begin
      Timeout.timeout timeout.to_i do
        sleep interval.to_f while messages.size < min
      end
    rescue Timeout::Error
      sleep 0.5 # last ditch effort to avoid flakiness
    end
    assert messages.size >= min, "Expected at least #{min} console message(s), but got #{messages.size}"
  end

  def assert_alert(match: nil, timeout: 5.seconds, interval: 0.1)
    message = nil

    # suppress invalid playwright warnings about unexpected dialogs
    suppress_stdout do
      page.on "dialog", ->(dialog) {
        message = dialog.message
        dialog.accept
      }
      yield if block_given?
      begin
        Timeout.timeout timeout.to_i do
          sleep interval.to_f until message
        end
      rescue Timeout::Error
        sleep 0.5 # last ditch effort to avoid flakiness
      end
    end

    match ?
      assert_match(match, message, "Expected alert dialog to match #{match.inspect}") :
      assert(message, "Expected alert dialog to be shown")
  end

  def suppress_stdout
    stdout = $stdout
    $stdout = StringIO.new
    yield
  ensure
    $stdout = stdout
  end
end
