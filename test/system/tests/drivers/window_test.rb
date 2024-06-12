# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversWindowTest < ApplicationSystemTestCase
  COUNT = 5

  test "invalid User-Agent request" do
    page.goto tests_url

    element(:window_driver).click

    wait_for_mutations_finished :window_driver_message do |el|
      assert_equal "...", el.inner_text
    end

    response = nil
    page.on "response", ->(r) { response = r }

    wait_for_mutations_finished :window_driver_message do |el|
      browser.contexts.first.set_extra_http_headers "User-Agent" => invalid_user_agent
      element(:window_driver_prevent).click
    end

    Timeout.timeout(2) { sleep 0.05 until response }

    # untrusted xhr request should be intercepted and blocked by the middleware
    assert_equal 403, response.status
    assert_equal "Forbidden", response.status_text
    assert_equal "Forbidden", response.text

    assert_equal "...", element(:window_driver_message).inner_text # DOM on the original page should be unchanged
  rescue Timeout::Error
    flunk "XHR response not intercepted!"
  end

  test "command that PREVENTS the rails controller action from performing" do
    page.goto tests_url
    element(:window_driver).click

    wait_for_mutations_finished :window_driver_message do |el|
      assert_equal "...", el.inner_text
    end

    COUNT.times do
      wait_for_mutations :window_driver_message do
        element(:window_driver_prevent).click
      end
    end

    wait_for_mutations_finished :window_driver_message do |el|
      assert_equal "PreventControllerActionCommand invoked #{COUNT} times", el.inner_text
    end
  end

  test "command that ALLOWS the rails controller action to perform" do
    page.goto tests_url
    element(:window_driver).click

    wait_for_mutations_finished :window_driver_message do |el|
      assert_equal "...", el.inner_text
    end

    COUNT.times do
      # wait_for_mutations :window_driver_message do
      element(:window_driver_allow).click
      sleep 0.1 # TODO: Figure out why this is needed for the window driver/allow rails mechanics
      # end
    end

    # wait_for_mutations_finished :window_driver_message do |el|
    # assert_equal "AllowControllerActionCommand invoked #{COUNT} times", el.inner_text
    assert_equal "AllowControllerActionCommand invoked #{COUNT} times", element(:window_driver_message).inner_text
    # end
  end

  test "command that ALLOWS the rails controller action to perform handles abort" do
    TurboBoost::Commands.config.alert_on_abort = true
    page.goto tests_url
    element(:window_driver).click
    assert_alert match: /HTTP 285 Abort/i do
      assert_console_messages min: 1, type: "warning", pattern: "turbo-boost:command:.*abort" do
        element(:window_driver_allow_with_abort).click
      end
    end
  end

  test "command that ALLOWS the rails controller action to perform handles error" do
    TurboBoost::Commands.config.alert_on_error = true
    page.goto tests_url
    element(:window_driver).click
    assert_alert match: /HTTP 500 Internal Server Error/i do
      assert_console_messages min: 1, type: "error", pattern: "turbo-boost:command:.*error" do
        element(:window_driver_allow_with_error).click
      end
    end
  end
end
