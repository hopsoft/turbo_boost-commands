# frozen_string_literal: true

require "application_system_test_case"

class DecrementFrameReplaceTest < ApplicationSystemTestCase
  PARENT_SELECTOR = "#basic_command-turbo-frame-replace"

  test "decrement once" do
    page.goto turbo_frame_replace_url
    user = User.last

    assert_equal 0, user.count
    assert_equal "0000", page.wait_for_selector("code[role='counter']").inner_text

    trigger = page.wait_for_selector("[data-turbo-command='DecrementCountCommand']")
    trigger.click
    wait_for_detach trigger

    assert_equal(-1, user.reload.count)
    assert_equal "-0001", page.wait_for_selector("code[role='counter']").inner_text
    assert_equal "Unchanged", page.wait_for_selector("code[role='state']").inner_text
  end

  test "decrement 3 times" do
    page.goto turbo_frame_replace_url
    user = User.last

    assert_equal 0, user.count
    assert_equal "0000", page.wait_for_selector("code[role='counter']").inner_text

    3.times do
      trigger = page.wait_for_selector("[data-turbo-command='DecrementCountCommand']")
      trigger.click
      wait_for_detach trigger
    end

    assert_equal(-3, user.reload.count)
    assert_equal "-0003", page.wait_for_selector("code[role='counter']").inner_text
    assert_equal "Unchanged", page.wait_for_selector("code[role='state']").inner_text
  end
end
