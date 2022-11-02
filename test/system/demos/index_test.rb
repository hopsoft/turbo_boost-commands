# frozen_string_literal: true

require "application_system_test_case"

class DemosTest < ApplicationSystemTestCase
  test "turbo reflex loaded and configured" do
    visit demos_url
    assert_equal "object", page.evaluate_script("typeof TurboReflex")
    assert_equal "object", page.evaluate_script("typeof TurboReflex.schema")
    assert_equal "object", page.evaluate_script("typeof TurboReflex.eventDelegates")
    assert page.evaluate_script("Array.isArray(TurboReflex.eventDelegates.change)")
    assert page.evaluate_script("Array.isArray(TurboReflex.eventDelegates.click)")
    assert page.evaluate_script("Array.isArray(TurboReflex.eventDelegates.submit)")
    assert_equal "function", page.evaluate_script("typeof TurboReflex.registerEventDelegate")
    assert page.evaluate_script("Array.isArray(TurboReflex.lifecycleEvents)")
    assert_equal "object", page.evaluate_script("typeof TurboReflex.state")
    assert_equal "object", page.evaluate_script("typeof TurboReflex.logger")
    assert_equal "debug", page.evaluate_script("TurboReflex.logger.level")
  end

  test "turbo reflex client state" do
    visit demos_url
    meta = find_by_id("turbo-reflex", visible: false)

    assert_equal "e30", meta["data-state"]
    assert_equal 0, page.evaluate_script("Object.keys(TurboReflex.state).length")
    assert_equal 0, page.evaluate_script("Object.values(TurboReflex.state).length")

    page.evaluate_script("TurboReflex.state.test = true")
    page.evaluate_script("TurboReflex.state.example = 'value'")
    assert page.evaluate_script("TurboReflex.state.test")
    assert_equal "value", page.evaluate_script("TurboReflex.state.example")
    assert_equal "eyJ0ZXN0Ijp0cnVlLCJleGFtcGxlIjoidmFsdWUifQ==", meta["data-state"]

    page.evaluate_script("TurboReflex.state.list = [1,2,3]")
    assert_equal "eyJ0ZXN0Ijp0cnVlLCJleGFtcGxlIjoidmFsdWUiLCJsaXN0IjpbMSwyLDNdfQ==", meta["data-state"]

    page.evaluate_script("TurboReflex.state.obj = {a: true, b: false, c: 'value'}")
    assert_equal "eyJ0ZXN0Ijp0cnVlLCJleGFtcGxlIjoidmFsdWUiLCJsaXN0IjpbMSwyLDNdLCJvYmoiOnsiYSI6dHJ1ZSwiYiI6ZmFsc2UsImMiOiJ2YWx1ZSJ9fQ==", meta["data-state"]
  end
end
