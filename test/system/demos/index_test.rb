# frozen_string_literal: true

require "application_system_test_case"

class DemosTest < ApplicationSystemTestCase
  test "turbo boost commands loaded and configured" do
    visit demos_url
    sleep 0.1
    assert_equal "object", page.evaluate_script("typeof TurboBoost")
    assert_equal "object", page.evaluate_script("typeof TurboBoost.Commands")
    assert_equal "object", page.evaluate_script("typeof TurboBoost.Commands.schema")
    assert_equal "object", page.evaluate_script("typeof TurboBoost.Commands.eventDelegates")
    assert page.evaluate_script("Array.isArray(TurboBoost.Commands.eventDelegates.change)")
    assert page.evaluate_script("Array.isArray(TurboBoost.Commands.eventDelegates.click)")
    assert page.evaluate_script("Array.isArray(TurboBoost.Commands.eventDelegates.submit)")
    assert_equal "function", page.evaluate_script("typeof TurboBoost.Commands.registerEventDelegate")
    assert page.evaluate_script("typeof TurboBoost.Commands.events === 'object'")
    assert_equal "object", page.evaluate_script("typeof TurboBoost.state")
    assert_equal "object", page.evaluate_script("typeof TurboBoost.Commands.logger")
    assert_equal "debug", page.evaluate_script("TurboBoost.Commands.logger.level")
  end

  test "turbo boost client state" do
    visit demos_url
    sleep 0.1
    meta = find_by_id("turbo-boost", visible: false)

    assert_equal "e30", meta["data-state"]
    assert_equal 0, page.evaluate_script("Object.keys(TurboBoost.state).length")
    assert_equal 0, page.evaluate_script("Object.values(TurboBoost.state).length")

    page.evaluate_script("TurboBoost.state.test = true")
    page.evaluate_script("TurboBoost.state.example = 'value'")
    assert page.evaluate_script("TurboBoost.state.test")
    assert_equal "value", page.evaluate_script("TurboBoost.state.example")
    assert_equal "eyJ0ZXN0Ijp0cnVlLCJleGFtcGxlIjoidmFsdWUifQ==", meta["data-state"]

    page.evaluate_script("TurboBoost.state.list = [1,2,3]")
    assert_equal "eyJ0ZXN0Ijp0cnVlLCJleGFtcGxlIjoidmFsdWUiLCJsaXN0IjpbMSwyLDNdfQ==", meta["data-state"]

    page.evaluate_script("TurboBoost.state.obj = {a: true, b: false, c: 'value'}")
    assert_equal "eyJ0ZXN0Ijp0cnVlLCJleGFtcGxlIjoidmFsdWUiLCJsaXN0IjpbMSwyLDNdLCJvYmoiOnsiYSI6dHJ1ZSwiYiI6ZmFsc2UsImMiOiJ2YWx1ZSJ9fQ==", meta["data-state"]
  end
end
