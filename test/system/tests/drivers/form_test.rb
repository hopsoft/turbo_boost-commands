# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversFormTest < ApplicationSystemTestCase
  COUNT = 10
  PARENT_SELECTOR = "#form-driver-test"

  def test_prevent_controller_action_command
    page.goto tests_url
    element("[data-test=form-driver]").click

    assert_equal "...", element("[data-test=message]").inner_text

    COUNT.times do
      trigger = element("[data-test=prevent]")
      trigger.click
      wait_for_detach trigger
    end

    assert_equal "PreventControllerActionCommand invoked #{COUNT} times", element("[data-test=message]").inner_text
  end

  def test_allow_controller_action_command
    page.goto tests_url
    element("[data-test=form-driver]").click

    assert_equal "...", element("[data-test=message]").inner_text

    COUNT.times do
      trigger = element("[data-test=allow]")
      trigger.click
      wait_for_detach trigger
    end

    assert_equal "AllowControllerActionCommand invoked #{COUNT} times", element("[data-test=message]").inner_text
  end
end
