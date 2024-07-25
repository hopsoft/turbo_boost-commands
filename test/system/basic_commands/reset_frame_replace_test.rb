# frozen_string_literal: true

require "application_system_test_case"

class ResetFrameReplaceTest < ApplicationSystemTestCase
  PARENT_SELECTOR = "#basic_command-turbo-frame-replace"

  def accept_dialod(dialog)
    dialog.accept
  end

  # test "increment once then reset and accept confirm" do
  #  skip "Playwright dialog handling not working yet"
  #  page.goto basic_command_url
  #  user = User.last

  #  assert_equal 0, user.count
  #  assert_equal "0000", page.wait_for_selector("code[role='counter']").inner_text

  #  trigger = page.wait_for_selector("[data-turbo-command='IncrementCountCommand']")
  #  trigger.click
  #  wait_for_detach trigger

  #  assert_equal 1, user.reload.count
  #  assert_equal "0001", page.wait_for_selector("code[role='counter']").inner_text

  #  page.on :dialog, ->(dialog) { dialog.accept }
  #  trigger = page.wait_for_selector("[data-turbo-command='ResetCountCommand']")
  #  trigger.click
  #  wait_for_detach trigger

  #  assert_equal 0, user.reload.count
  #  assert_equal "0000", page.wait_for_selector("code[role='counter']").inner_text
  # end

  # test "increment once then reset and dismiss confirm" do
  #  skip "Playwright dialog handling not working yet"
  #  page.goto basic_command_url
  #  user = User.last

  #  assert_equal 0, user.count
  #  assert_equal "0000", page.wait_for_selector("code[role='counter']").inner_text

  #  trigger = page.wait_for_selector("[data-turbo-command='IncrementCountCommand']")
  #  trigger.click
  #  wait_for_detach trigger

  #  assert_equal 1, user.reload.count
  #  assert_equal "0001", page.wait_for_selector("code[role='counter']").inner_text

  #  page.on :dialog, ->(dialog) { dialog.accept }
  #  trigger = page.wait_for_selector("[data-turbo-command='ResetCountCommand']")
  #  trigger.click
  #  wait_for_detach trigger

  #  assert_equal 1, user.reload.count
  #  assert_equal "0001", page.wait_for_selector("code[role='counter']").inner_text
  # end
end
