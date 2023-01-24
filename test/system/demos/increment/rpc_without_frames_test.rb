# frozen_string_literal: true

require "application_system_test_case"

class IncrementRpcWithoutFramesTest < ApplicationSystemTestCase
  test "rpc-over-http" do
    name = "link-in-frame"
    page.goto demo_url("increment")

    # before demo
    meta_element = page.wait_for_selector("meta#turbo-boost", state: "attached")
    assert_equal "e30", meta_element["data-state"]
    assert_nil js("TurboBoost.state.active_demo")

    # open demo
    demo_element = page.wait_for_selector("##{name}-demo")
    demo_element.wait_for_selector("[data-turbo-command='DemosCommand#toggle']").click
    wait_for_turbo_stream target: "DOM", action: "invoke"
    assert js("document.cookie").include?("turbo_boost.state")
    assert_equal 0, demo_element.wait_for_selector("[data-role='counter']").inner_text.to_i
    assert_equal "N/A", demo_element.wait_for_selector("[data-role='http-fingerprint']").inner_text
    assert_equal "N/A", demo_element.wait_for_selector("[data-role='http-method']").inner_text

    # execute demo
    demo_element.wait_for_selector("[data-turbo-command='CounterCommand#increment']").click
    wait_for_turbo_stream target: "DOM", action: "invoke"
    assert_equal 1, demo_element.wait_for_selector("[data-role='counter']").inner_text.to_i
    assert_not_equal "N/A", demo_element.wait_for_selector("[data-role='http-fingerprint']").inner_text
    assert_equal "GET", demo_element.wait_for_selector("[data-role='http-method']").inner_text
    assert demo_element.wait_for_selector("[data-command-requested='true']")
    assert demo_element.wait_for_selector("[data-command-performed='true']")

    # close demo
    demo_element.wait_for_selector("[data-turbo-command='DemosCommand#toggle']").click
    wait_for_turbo_stream target: "DOM", action: "invoke"
    assert js("document.cookie").include?("turbo_boost.state")
    assert_equal "e30", meta_element["data-state"]
    assert_nil js("TurboBoost.state.active_demo")
  end
end
