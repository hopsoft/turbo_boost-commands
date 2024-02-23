# frozen_string_literal: true

require "application_system_test_case"

class DecrementNoFrameTest < ApplicationSystemTestCase
  PARENT_SELECTOR = "#basic_command-no-frame"

  test "decrement once" do
    page.goto basic_command_url
    user = User.first

    assert_equal 0, user.count
    assert_equal "0000", element("code[role='counter']").inner_text

    trigger = element("[data-turbo-command='DecrementCountCommand']")
    trigger.click
    wait_for_detach trigger

    assert_equal(-1, user.reload.count)
    assert_equal "-0001", element("code[role='counter']").inner_text
  end

  test "decrement 3 times" do
    page.goto basic_command_url
    user = User.first

    assert_equal 0, user.reload.count
    assert_equal "0000", element("code[role='counter']").inner_text

    3.times do
      trigger = element("[data-turbo-command='DecrementCountCommand']")
      trigger.click
      wait_for_detach trigger
    end

    assert_equal(-3, user.reload.count)
    assert_equal "-0003", page.wait_for_selector("#basic_command-no-frame code[role='counter']").inner_text
  end
end
