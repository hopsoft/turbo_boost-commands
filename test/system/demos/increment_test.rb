# frozen_string_literal: true

require "application_system_test_case"

class IncrementTest < ApplicationSystemTestCase
  test "link-in-frame" do
    name = "link-in-frame"
    visit demo_url("increment")

    # before demo
    assert_equal "", page.evaluate_script("document.cookie")
    assert_equal "e30", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_nil page.evaluate_script("TurboReflex.state.active_demo")

    # open demo
    find_by_id("#{name}-demo").find("[data-turbo-reflex='DemosReflex#toggle']").click
    assert_equal "_turbo_reflex_state=eNpj4Yhmi2b3VBJITC7JLEuNT0nNzWezYnN181QSysnMy9bNzNNNK0rMTWWzZggBABL_DJg%3D", page.evaluate_script("document.cookie")
    assert_equal "eyJhY3RpdmVfZGVtbyI6ImxpbmstaW4tZnJhbWUifQ", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_equal name, page.evaluate_script("TurboReflex.state.active_demo")
    assert_equal 0, find_by_id("#{name}-demo").find("[data-role='counter']").text.to_i
    assert_equal "N/A", find_by_id("#{name}-demo").find("[data-role='http-fingerprint']").text
    assert_equal "N/A", find_by_id("#{name}-demo").find("[data-role='http-method']").text

    # execute demo
    find_by_id("#{name}-demo").find("[data-turbo-reflex='CounterReflex#increment']").click
    assert_equal 1, find_by_id("#{name}-demo").find("[data-role='counter']").text.to_i
    assert_not_equal "N/A", find_by_id("#{name}-demo").find("[data-role='http-fingerprint']").text
    assert_equal "GET", find_by_id("#{name}-demo").find("[data-role='http-method']").text

    # close demo
    find_by_id("#{name}-demo").find("[data-turbo-reflex='DemosReflex#toggle']").click
    assert_equal "_turbo_reflex_state=eNpj4YhmAAAA4gBo", page.evaluate_script("document.cookie")
    assert_equal "eyJhY3RpdmVfZGVtbyI6bnVsbH0", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_nil page.evaluate_script("TurboReflex.state.active_demo")
  end

  test "button-in-frame basic" do
    name = "button-in-frame"
    visit demo_url("increment")

    # before demo
    assert_equal "", page.evaluate_script("document.cookie")
    assert_equal "e30", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_nil page.evaluate_script("TurboReflex.state.active_demo")

    # open demo
    find_by_id("#{name}-demo").find("[data-turbo-reflex='DemosReflex#toggle']").click
    assert_equal "_turbo_reflex_state=eNpj4Yhmi2b3VBJITC7JLEuNT0nNzWezYnN181QSSSotKcnP083M000rSsxNZbNmCAEAMkoNiA%3D%3D", page.evaluate_script("document.cookie")
    assert_equal "eyJhY3RpdmVfZGVtbyI6ImJ1dHRvbi1pbi1mcmFtZSJ9", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_equal name, page.evaluate_script("TurboReflex.state.active_demo")
    assert_equal 0, find_by_id("#{name}-demo").find("[data-role='counter']").text.to_i
    assert_equal "N/A", find_by_id("#{name}-demo").find("[data-role='http-fingerprint']").text
    assert_equal "N/A", find_by_id("#{name}-demo").find("[data-role='http-method']").text

    # execute demo
    find_by_id("#{name}-demo").all("[data-turbo-reflex='CounterReflex#increment']").first.click
    assert_equal 1, find_by_id("#{name}-demo").find("[data-role='counter']").text.to_i
    assert_not_equal "N/A", find_by_id("#{name}-demo").find("[data-role='http-fingerprint']").text
    assert_equal "GET", find_by_id("#{name}-demo").find("[data-role='http-method']").text

    # close demo
    find_by_id("#{name}-demo").find("[data-turbo-reflex='DemosReflex#toggle']").click
    assert_equal "_turbo_reflex_state=eNpj4YhmAAAA4gBo", page.evaluate_script("document.cookie")
    assert_equal "eyJhY3RpdmVfZGVtbyI6bnVsbH0", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_nil page.evaluate_script("TurboReflex.state.active_demo")
  end

  # TODO: Get button_to working in the test suite
  # test "button-in-frame button_to" do
  #   name = "button-in-frame"
  #   visit demo_url("increment")

  #   # before demo
  #   assert_equal "", page.evaluate_script("document.cookie")
  #   assert_equal "e30", find_by_id("turbo-reflex", visible: false)["data-state"]
  #   assert_nil page.evaluate_script("TurboReflex.state.active_demo")

  #   # open demo
  #   find_by_id("#{name}-demo").find("[data-turbo-reflex='DemosReflex#toggle']").click
  #   assert_equal "_turbo_reflex_state=eNpj4Yhmi2b3VBJITC7JLEuNT0nNzWezYnN181QSSSotKcnP083M000rSsxNZbNmCAEAMkoNiA%3D%3D", page.evaluate_script("document.cookie")
  #   assert_equal "eyJhY3RpdmVfZGVtbyI6ImJ1dHRvbi1pbi1mcmFtZSJ9", find_by_id("turbo-reflex", visible: false)["data-state"]
  #   assert_equal name, page.evaluate_script("TurboReflex.state.active_demo")
  #   assert_equal 0, find_by_id("#{name}-demo").find("[data-role='counter']").text.to_i
  #   assert_equal "N/A", find_by_id("#{name}-demo").find("[data-role='http-fingerprint']").text
  #   assert_equal "N/A", find_by_id("#{name}-demo").find("[data-role='http-method']").text

  #   # execute demo
  #   find_by_id("#{name}-demo").all("[data-turbo-reflex='CounterReflex#increment']").last.click
  #   assert_equal 1, find_by_id("#{name}-demo").find("[data-role='counter']").text.to_i
  #   assert_not_equal "N/A", find_by_id("#{name}-demo").find("[data-role='http-fingerprint']").text
  #   assert_equal "GET", find_by_id("#{name}-demo").find("[data-role='http-method']").text

  #   # close demo
  #   find_by_id("#{name}-demo").find("[data-turbo-reflex='DemosReflex#toggle']").click
  #   assert_equal "_turbo_reflex_state=eNpj4YhmAAAA4gBo", page.evaluate_script("document.cookie")
  #   assert_equal "eyJhY3RpdmVfZGVtbyI6bnVsbH0", find_by_id("turbo-reflex", visible: false)["data-state"]
  #   assert_nil page.evaluate_script("TurboReflex.state.active_demo")
  # end
end
