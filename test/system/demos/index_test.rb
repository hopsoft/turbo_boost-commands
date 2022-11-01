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
end
