# frozen_string_literal: true

require "application_system_test_case"

class IncrementTest < ApplicationSystemTestCase
  test "link-in-frame" do
    name = "link-in-frame"
    visit demo_url("increment")

    # before demo
    assert_equal "e30", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_nil page.evaluate_script("TurboReflex.state.active_demo")

    # open demo
    find_by_id("#{name}-demo").find("[data-turbo-reflex='DemosReflex#toggle']").click
    assert page.evaluate_script("document.cookie").include?("turbo_reflex.state")
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
    assert page.evaluate_script("document.cookie").include?("turbo_reflex.state")
    assert_equal "e30", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_nil page.evaluate_script("TurboReflex.state.active_demo")
  end

  test "button-in-frame basic" do
    name = "button-in-frame"
    visit demo_url("increment")

    # before demo
    assert_equal "e30", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_nil page.evaluate_script("TurboReflex.state.active_demo")

    # open demo
    find_by_id("#{name}-demo").find("[data-turbo-reflex='DemosReflex#toggle']").click
    assert page.evaluate_script("document.cookie").include?("turbo_reflex.state")
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
    assert page.evaluate_script("document.cookie").include?("turbo_reflex.state")
    assert_equal "e30", find_by_id("turbo-reflex", visible: false)["data-state"]
    assert_nil page.evaluate_script("TurboReflex.state.active_demo")
  end
end
