# frozen_string_literal: true

require "capybara-playwright-driver"
require "timeout"
require "test_helper"

Capybara.default_max_wait_time = 10
Capybara.default_retry_interval = 2
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

  class << self
    def start_playwright
      @playwright_execution ||= Playwright.create(playwright_cli_executable_path: "npx playwright")
    end

    def stop_playwright
      @playwright_execution&.stop
    end

    def playwright
      @playwright_execution.playwright
    end
  end

  Minitest.after_run { ApplicationSystemTestCase.stop_playwright }

  attr_reader :browser, :page

  def before_setup
    super
    ApplicationSystemTestCase.start_playwright
    # migrations_dir = File.expand_path("dummy/db/migrate", __dir__)
    # ActiveRecord::MigrationContext.new(migrations_dir).migrate

    @browser = ApplicationSystemTestCase.playwright.public_send(BROWSER).launch
    @page = @browser.new_page
    @page.set_default_timeout Capybara.default_max_wait_time * 1_000
  end

  def after_teardown
    super
    @page&.close
    @browser&.close
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
    yield element(testid).element_handle if block_given?
    Timeout.timeout timeout.to_i do
      sleep interval.to_f until element_mutated?(testid)
    end
  rescue Timeout::Error
    sleep 0.5 # last ditch effort to avoid flakiness
    yield element(testid).element_handle if block_given?
  ensure
    wait_for_mutations_finished testid, timeout: timeout, interval: interval
  end

  # Waits for an element's mutation tracking to reset, then yields the element handle.
  # SEE: test/dummy/app/javascript/tests/index.js
  #
  # @param testid [String,Symbol] The element's data-testid attribute value
  # @param timeout [Integer] The maximum time to wait (default: 5s)
  # @param interval [Integer] The time interval to wait between checks (default: 20ms)
  def wait_for_mutations_finished(testid, timeout: 5.seconds, interval: 0.02)
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

  def invalid_user_agents
    @invalid_user_agents ||= begin
      spec = Gem::Specification.find_by_name("device_detector")
      path = File.join(spec.full_gem_path, "regexes", "bots.yml")
      YAML.safe_load_file(path)
        .reject { |entry| /[#{Regexp.escape "?*[]\\"}]/.match? entry["regex"] }
        .map { |entry| entry["regex"] }
    end
  end

  def invalid_user_agent
    invalid_user_agents.sample
  end
end
