# frozen_string_literal: true

require "application_system_test_case"

class ResetNoFrameTest < ApplicationSystemTestCase
  PARENT_SELECTOR = "#basic_command-no-frame"

  test "increment once then reset and accept confirm" do
    skip "Playwright dialog handling not working yet"
    page.goto basic_command_url
    user = User.first

    assert_equal 0, user.count
    assert_equal "0000", element("code[role='counter']").inner_text

    trigger = element("[data-turbo-command='IncrementCountCommand']")
    trigger.click
    wait_for_detach trigger

    assert_equal 1, user.reload.count
    assert_equal "0001", element("code[role='counter']").inner_text

    page.on :dialog, ->(dialog) { dialog.accept }
    trigger = element("[data-turbo-command='ResetCountCommand']")
    trigger.click
    wait_for_detach trigger

    assert_equal 2, user.reload.count
    assert_equal "0002", element("code[role='counter']").inner_text
  end

  test "increment once then reset and dismiss confirm" do
    skip "Playwright dialog handling not working yet"
    page.goto basic_command_url
    user = User.first

    assert_equal 0, user.count
    assert_equal "0000", element("code[role='counter']").inner_text

    trigger = element("[data-turbo-command='IncrementCountCommand']")
    trigger.click
    wait_for_detach trigger

    assert_equal 1, user.reload.count
    assert_equal "0001", element("code[role='counter']").inner_text

    page.on :dialog, ->(dialog) { dialog.accept }
    trigger = element("[data-turbo-command='ResetCountCommand']")
    trigger.click
    wait_for_detach trigger

    assert_equal 1, user.reload.count
    assert_equal "0001", element("code[role='counter']").inner_text
  end
end
