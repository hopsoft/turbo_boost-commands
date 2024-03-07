# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversWindowTest < ApplicationSystemTestCase
  COUNT = 5

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
      wait_for_mutations :window_driver_message do
        element(:window_driver_allow).click
      end
    end

    wait_for_mutations_finished :window_driver_message do |el|
      assert_equal "AllowControllerActionCommand invoked #{COUNT} times", el.inner_text
    end
  end

  test "command that ALLOWS the rails controller action to perform handles abort" do
    TurboBoost::Commands.config.alert_on_abort = true
    page.goto tests_url
    element(:window_driver).click

    alerted = false
    page.on "dialog", ->(dialog) { alerted = true }

    assert_console_messages min: 1, type: "warning", pattern: "turbo-boost:command:.*abort" do
      element(:window_driver_allow_abort).click
    end

    sleep 0.1 # wait for alert to be shown
    assert alerted, "Expected alert dialog to be shown"
  end
end
