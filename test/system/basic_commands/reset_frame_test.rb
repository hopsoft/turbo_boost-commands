# frozen_string_literal: true

require "application_system_test_case"

class ResetFrameTest < ApplicationSystemTestCase
  fixtures :users

  def demo
    page.wait_for_selector("#basic_command-turbo-frame")
  end

  test "increment once then reset and accept confirm" do
    skip "Playwright dialog handling not working yet"
    page.goto basic_command_url

    assert_equal 0, User.first.count
    assert_equal "0000", demo.wait_for_selector("code[role='counter']").inner_text
    demo.wait_for_selector("[data-turbo-command='IncrementCountCommand']").click
    sleep 0.1
    assert_equal 1, User.first.count
    assert_equal "0001", demo.wait_for_selector("code[role='counter']").inner_text

    page.on :dialog, ->(dialog) { dialog.accept }
    demo.wait_for_selector("[data-turbo-command='ResetCountCommand']").click

    sleep 0.1
    assert_equal 2, User.first.count
    assert_equal "0002", demo.wait_for_selector("code[role='counter']").inner_text
  end

  test "increment once then reset and dismiss confirm" do
    skip "Playwright dialog handling not working yet"
    page.goto basic_command_url

    assert_equal 0, User.first.count
    assert_equal "0000", demo.wait_for_selector("code[role='counter']").inner_text
    demo.wait_for_selector("[data-turbo-command='IncrementCountCommand']").click
    sleep 0.1
    assert_equal 1, User.first.count
    assert_equal "0001", demo.wait_for_selector("code[role='counter']").inner_text

    page.on :dialog, ->(dialog) { dialog.dismiss }
    demo.wait_for_selector("[data-turbo-command='ResetCountCommand']").click

    sleep 0.1
    assert_equal 1, User.first.count
    assert_equal "0001", demo.wait_for_selector("code[role='counter']").inner_text
  end
end
