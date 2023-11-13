# frozen_string_literal: true

require "application_system_test_case"

class IncrementFrameTest < ApplicationSystemTestCase
  fixtures :users

  def demo
    page.wait_for_selector("#basic_command-turbo-frame")
  end

  test "increment once" do
    page.goto basic_command_url

    assert_equal 0, User.first.count
    assert_equal "0000", demo.wait_for_selector("code[role='counter']").inner_text
    demo.wait_for_selector("[data-turbo-command='IncrementCountCommand']").click
    sleep 0.1
    assert_equal 1, User.first.count
    assert_equal "0001", demo.wait_for_selector("code[role='counter']").inner_text
  end

  test "increment 3 times" do
    page.goto basic_command_url

    assert_equal 0, User.first.count
    assert_equal "0000", demo.wait_for_selector("code[role='counter']").inner_text
    3.times do
      demo.wait_for_selector("[data-turbo-command='IncrementCountCommand']").click
      sleep 0.1
    end

    assert_equal 3, User.first.count
    assert_equal "0003", demo.wait_for_selector("code[role='counter']").inner_text
  end
end
