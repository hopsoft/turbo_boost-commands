# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversWindowTest < ApplicationSystemTestCase
  def setup
    page.goto tests_url
  end

  def test_append_command
    count = 10
    details_element.click
    assert_equal "Placeholder...", message_element.inner_text
    count.times do
      append_element.click
      wait_for_detach append_element
    end
    assert_equal "AppendCommand invoked #{count} times", message_element.inner_text
  end

  def test_replace_command
    count = 10
    details_element.click
    assert_equal "Placeholder...", message_element.inner_text
    count.times do
      replace_element.click
      wait_for_detach replace_element
    end
    assert_equal "ReplaceCommand invoked #{count} times", message_element.inner_text
  end

  private

  def details_element
    page.wait_for_selector "#drivers-window"
  end

  def message_element
    details_element.wait_for_selector "[data-test=message]"
  end

  def append_element
    details_element.wait_for_selector "[data-test=append]"
  end

  def replace_element
    details_element.wait_for_selector "[data-test=replace]"
  end
end
