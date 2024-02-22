# frozen_string_literal: true

require "application_system_test_case"

class TurboBoostGlobalsTest < ApplicationSystemTestCase
  test "turbo boost commands loaded and configured" do
    with_playwright_page do |page|
      page.goto basic_command_url
      page.wait_for_timeout 100 # TODO: change to page.expect_event("turbo-boost:command:success")

      assert_equal "object", js("typeof TurboBoost")
      assert_equal "object", js("typeof TurboBoost.Commands")
      assert_equal "object", js("typeof TurboBoost.Commands.schema")
      assert js("Array.isArray(TurboBoost.Commands.eventDelegates)")
      assert js("Array.isArray(TurboBoost.Commands.eventDelegates.find(e => e.name === 'change').selectors)")
      assert js("Array.isArray(TurboBoost.Commands.eventDelegates.find(e => e.name === 'click').selectors)")
      assert js("Array.isArray(TurboBoost.Commands.eventDelegates.find(e => e.name === 'submit').selectors)")
      assert_equal "function", js("typeof TurboBoost.Commands.registerEventDelegate")
      assert_equal "object", js("typeof TurboBoost.Commands.events")
      assert_equal "object", js("typeof TurboBoost.State")
      assert_equal "object", js("typeof TurboBoost.Commands.logger")
      assert_equal "debug", js("TurboBoost.Commands.logger.level")
      assert_equal TurboBoost::Commands::VERSION, js("TurboBoost.Commands.VERSION")
    end
  end

  test "turbo boost state" do
    with_playwright_page do |page|
      page.goto basic_command_url
      page.wait_for_timeout 100 # TODO: change to page.expect_event("turbo-boost:command:success")

      assert js("TurboBoost.State.signed.length > 0")
      assert_not_nil js("TurboBoost.State.current.command_token") # used for forgery protection

      js("TurboBoost.State.current.test = true")
      js("TurboBoost.State.current.example = 'value'")
      assert js("TurboBoost.State.current.test")
      assert_equal "value", js("TurboBoost.State.current.example")
      assert_equal "value", js("TurboBoost.State.changed.example")
    end
  end
end
