# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversMethodTest < ApplicationSystemTestCase
  COUNT = 10

  def test_prevent_controller_action_command
    with_playwright_page do |page|
      page.goto tests_url
      page.wait_for_selector("#drivers-method").click

      assert_equal "...", page.wait_for_selector("#drivers-method [data-test=message]").inner_text

      COUNT.times do
        page.wait_for_selector("#drivers-method [data-test=prevent]").click
        page.wait_for_timeout 100 # TODO: change to page.expect_event("turbo-boost:command:success")
      end

      assert_equal "PreventControllerActionCommand invoked #{COUNT} times",
        page.wait_for_selector("#drivers-method [data-test=message]").inner_text
    end
  end

  def test_allow_controller_action_command
    with_playwright_page do |page|
      page.goto tests_url
      page.wait_for_selector("#drivers-method").click

      assert_equal "...", page.wait_for_selector("#drivers-method [data-test=message]").inner_text

      COUNT.times do
        page.wait_for_selector("#drivers-method [data-test=allow]").click
        page.wait_for_timeout 100 # TODO: change to page.expect_event("turbo-boost:command:success")
      end

      assert_equal "AllowControllerActionCommand invoked #{COUNT} times",
        page.wait_for_selector("#drivers-method [data-test=message]").inner_text
    end
  end
end
