# frozen_string_literal: true

require "application_system_test_case"

class TurboBoosSetupTest < ApplicationSystemTestCase
  test "turbo boost commands loaded and configured" do
    page.goto basic_command_url

    assert_equal "object", js("typeof TurboBoost")
    assert_equal "object", js("typeof TurboBoost.Commands")
    assert_equal "object", js("typeof TurboBoost.Commands.schema")
    assert js("Array.isArray(TurboBoost.Commands.eventDelegates)")
    assert js("Array.isArray(TurboBoost.Commands.eventDelegates.find(e => e.name === 'change').selectors)")
    assert js("Array.isArray(TurboBoost.Commands.eventDelegates.find(e => e.name === 'click').selectors)")
    assert js("Array.isArray(TurboBoost.Commands.eventDelegates.find(e => e.name === 'submit').selectors)")
    assert_equal "function", js("typeof TurboBoost.Commands.registerEventDelegate")
    assert_equal "object", js("typeof TurboBoost.Commands.events")
    assert_equal "object", js("typeof TurboBoost.state")
    assert_equal "object", js("typeof TurboBoost.Commands.logger")
    assert_equal "debug", js("TurboBoost.Commands.logger.level")
  end

  test "turbo boost client state" do
    page.goto basic_command_url

    meta_element = page.wait_for_selector("meta#turbo-boost", state: "attached")
    assert_equal "{}", meta_element["data-state"]
    assert_equal 0, js("Object.keys(TurboBoost.state).length")
    assert_equal 0, js("Object.values(TurboBoost.state).length")

    js("TurboBoost.state.test = true")
    js("TurboBoost.state.example = 'value'")
    assert js("TurboBoost.state.test")
    assert_equal "value", js("TurboBoost.state.example")
    assert_equal "value", js("TurboBoost.stateChanges.example")
  end
end
