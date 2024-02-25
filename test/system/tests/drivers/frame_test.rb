# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversFrameTest < ApplicationSystemTestCase
  COUNT = 10

  test "command that PREVENTS the rails controller action from performing" do
    page.goto tests_url
    element(:frame_driver).click
    wait_for_mutations_reset :frame_driver

    assert_equal "...", element(:frame_driver_message).inner_text

    COUNT.times do
      element(:frame_driver_prevent).click
      wait_for_turbo_boost :frame_driver
    end

    assert_equal "PreventControllerActionCommand invoked #{COUNT} times", element(:frame_driver_message).inner_text
  end

  test "command that ALLOWS the rails controller action to perform" do
    page.goto tests_url
    element(:frame_driver).click
    wait_for_mutations_reset :frame_driver

    assert_equal "...", element(:frame_driver_message).inner_text

    COUNT.times do
      element(:frame_driver_allow).click
      wait_for_turbo_boost :frame_driver
    end

    assert_equal "AllowControllerActionCommand invoked #{COUNT} times", element(:frame_driver_message).inner_text
  end
end
