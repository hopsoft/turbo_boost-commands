# frozen_string_literal: true

require "application_system_test_case"

class TurboBoostGlobalsTest < ApplicationSystemTestCase
  test "turbo boost commands loaded and configured" do
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

  test "turbo boost state" do
    page.goto basic_command_url
    page.wait_for_timeout 100 # TODO: change to page.expect_event("turbo-boost:command:success")

    assert_equal "object", js("typeof TurboBoost.State.current")
    assert_equal "function", js("typeof TurboBoost.State.initialize")
    js("TurboBoost.State.initialize(JSON.stringify({ unsigned: { example: 'value' }}))")

    assert_equal "value", js("TurboBoost.State.current.example")
  end
end
