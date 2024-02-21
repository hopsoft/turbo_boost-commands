# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversFrameTest < ApplicationSystemTestCase
  def setup
    page.goto tests_url
  end

  def test_prevent_controller_action_command
    with_retries do
      count = 10
      details_element.click
      assert_equal "...", message_element.inner_text
      count.times do
        prevent_element.click
        wait_for_detach prevent_element
      end
      assert_equal "PreventControllerActionCommand invoked #{count} times", message_element.inner_text
    end
  end

  def test_allow_controller_action_command
    with_retries do
      count = 10
      details_element.click
      assert_equal "...", message_element.inner_text
      count.times do
        allow_element.click
        wait_for_detach allow_element
      end
      assert_equal "AllowControllerActionCommand invoked #{count} times", message_element.inner_text
    end
  end

  private

  def details_element
    page.wait_for_selector "#drivers-frame details"
  end

  def message_element
    details_element.wait_for_selector "[data-test=message]"
  end

  def prevent_element
    details_element.wait_for_selector "[data-test=prevent]"
  end

  def allow_element
    details_element.wait_for_selector "[data-test=allow]"
  end
end
