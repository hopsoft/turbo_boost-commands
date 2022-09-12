# frozen_string_literal: true

require "application_system_test_case"

class DemosTest < ApplicationSystemTestCase
  test "turbo reflex loaded" do
    visit demos_url
    assert page.evaluate_script("typeof TurboReflex") == "object"
    assert page.evaluate_script("typeof TurboReflex.registerEvent") == "function"
    assert page.evaluate_script("typeof TurboReflex.logRegisteredEvents") == "function"
    assert page.evaluate_script("typeof TurboReflex.logLifecycleEventNames") == "function"
  end
end
