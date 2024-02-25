# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversWindowTest < ApplicationSystemTestCase
  COUNT = 10

  test "command that PREVENTS the rails controller action from performing" do
    page.goto tests_url
    element(:window_driver).click
    wait_for_mutations_reset :window_driver

    assert_equal "...", element(:window_driver_message).inner_text

    COUNT.times do
      element(:window_driver_prevent).click
      wait_for_mutations :window_driver_message
    end

    assert_equal "PreventControllerActionCommand invoked #{COUNT} times", element(:window_driver_message).inner_text
  end

  test "command that ALLOWS the rails controller action to perform" do
    page.goto tests_url
    element(:window_driver).click
    wait_for_mutations_reset :window_driver

    assert_equal "...", element(:window_driver_message).inner_text

    COUNT.times do
      element(:window_driver_allow).click
      wait_for_turbo_boost :window_driver # mutation tracking doesn't work when the entire page morphs for some reason
    end

    assert_equal "AllowControllerActionCommand invoked #{COUNT} times", element(:window_driver_message).inner_text
  end
end
