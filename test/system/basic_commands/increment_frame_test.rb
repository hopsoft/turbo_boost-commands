# frozen_string_literal: true

require "application_system_test_case"

class IncrementFrameTest < ApplicationSystemTestCase
  fixtures :users

  test "increment once" do
    with_playwright_page do |page|
      page.goto basic_command_url

      assert_equal 0, User.first.count
      assert_equal "0000", page.wait_for_selector("#basic_command-turbo-frame code[role='counter']").inner_text
      page.wait_for_selector("#basic_command-turbo-frame [data-turbo-command='IncrementCountCommand']").click
      page.wait_for_timeout 100 # TODO: change to page.expect_event("turbo-boost:command:success")
      assert_equal 1, User.first.count
      assert_equal "0001", page.wait_for_selector("#basic_command-turbo-frame code[role='counter']").inner_text
    end
  end

  test "increment 3 times" do
    with_playwright_page do |page|
      page.goto basic_command_url

      assert_equal 0, User.first.count
      assert_equal "0000", page.wait_for_selector("#basic_command-turbo-frame code[role='counter']").inner_text
      3.times do
        page.wait_for_selector("#basic_command-turbo-frame [data-turbo-command='IncrementCountCommand']").click
        page.wait_for_timeout 100 # TODO: change to page.expect_event("turbo-boost:command:success")
      end

      assert_equal 3, User.first.count
      assert_equal "0003", page.wait_for_selector("#basic_command-turbo-frame code[role='counter']").inner_text
    end
  end
end
