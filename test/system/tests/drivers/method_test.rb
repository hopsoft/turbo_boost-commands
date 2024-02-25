# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversMethodTest < ApplicationSystemTestCase
  COUNT = 10

  test "command that PREVENTS the rails controller action from performing" do
    page.goto tests_url
    element(:method_driver).click
    wait_for_mutations_reset :method_driver

    assert_equal "...", element(:method_driver_message).inner_text

    COUNT.times do
      element(:method_driver_prevent).click
      wait_for_turbo_boost :method_driver
    end

    assert_equal "PreventControllerActionCommand invoked #{COUNT} times", element(:method_driver_message).inner_text
  end

  test "command that ALLOWS the rails controller action to perform" do
    page.goto tests_url
    element(:method_driver).click

    assert_equal "...", element(:method_driver_message).inner_text

    COUNT.times do
      element(:method_driver_allow).click
      wait_for_turbo_boost :method_driver
    end

    assert_equal "AllowControllerActionCommand invoked #{COUNT} times", element(:method_driver_message).inner_text
  end
end
