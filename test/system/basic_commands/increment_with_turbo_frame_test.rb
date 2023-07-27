# frozen_string_literal: true

require "application_system_test_case"

class IncrementButtonInFrameTest < ApplicationSystemTestCase
  fixtures :users

  test "increment once" do
    page.goto basic_command_url

    assert_equal 0, User.first.count
    assert_equal "0000", page.wait_for_selector("turbo-frame code[role='counter']").inner_text
    page.wait_for_selector("turbo-frame [data-turbo-command='IncrementCountCommand']").click
    sleep 0.1
    assert_equal 1, User.first.count
    assert_equal "0001", page.wait_for_selector("turbo-frame code[role='counter']").inner_text
  end

  test "increment 3 times" do
    page.goto basic_command_url

    assert_equal 0, User.first.count
    assert_equal "0000", page.wait_for_selector("turbo-frame code[role='counter']").inner_text
    3.times do
      page.wait_for_selector("turbo-frame [data-turbo-command='IncrementCountCommand']").click
      sleep 0.1
    end

    assert_equal 3, User.first.count
    assert_equal "0003", page.wait_for_selector("turbo-frame code[role='counter']").inner_text
  end
end
