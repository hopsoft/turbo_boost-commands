# frozen_string_literal: true

require "application_system_test_case"

class IncrementTest < ApplicationSystemTestCase
  test "click reflex-link once" do
    visit demo_url("increment")

    meta = find_by_id("turbo-reflex", visible: false)
    demo = find_by_id("link-in-frame-demo")
    toggler = demo.find("[data-turbo-reflex='DemosReflex#toggle']")

    assert_equal "", page.evaluate_script("document.cookie") # cookie not written because there hasn't been a state change yet
    assert_equal "e30", meta["data-state"]
    assert_nil page.evaluate_script("TurboReflex.state.active_demo")

    toggler.click

    assert_equal "_turbo_reflex_state=eNpj4Yhmi2b3VBJITC7JLEuNT0nNzWezYnN181QSysnMy9bNzNNNK0rMTWWzZggBABL_DJg%3D", page.evaluate_script("document.cookie")
    assert_equal "link-in-frame", page.evaluate_script("TurboReflex.state.active_demo")
    assert_equal "eyJhY3RpdmVfZGVtbyI6ImxpbmstaW4tZnJhbWUifQ", meta["data-state"]

    counter = demo.find("[data-role='counter']")
    fingerprint = demo.find("[data-role='http-fingerprint']")
    method = demo.find("[data-role='http-method']")

    assert_equal 0, counter.text.to_i
    assert_equal "N/A", fingerprint.text
    assert_equal "N/A", method.text

    link = demo.find("[data-turbo-reflex='CounterReflex#increment']")
    link.click

    assert_equal 1, counter.text.to_i
    assert_not_equal "N/A", fingerprint.text
    assert_equal "GET", method.text

    # TODO: Get hide demo working
    # toggler.click

    # assert_equal "", page.evaluate_script("document.cookie")
    # assert_equal "e30", meta["data-state"]
    # assert_nil page.evaluate_script("TurboReflex.state.active_demo")
  end

  # test "click reflex-button once" do
  #   visit demo_url("increment")

  #   fingerprint = find_by_id("stat-fingerprint").text
  #   assert_equal "0", find_by_id("stat-counter", text: /0/).text

  #   find_by_id("reflex-button").click

  #   assert_equal "GET", find_by_id("stat-method", text: /GET/).text
  #   assert_equal "1", find_by_id("stat-counter", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  # end

  # test "click reflex-button 5 times" do
  #   visit demo_url("increment")

  #   fingerprint = find_by_id("stat-fingerprint").text
  #   assert_equal "0", find_by_id("stat-counter", text: /0/).text

  #   5.times { find_by_id("reflex-button").click }

  #   assert_equal "GET", find_by_id("stat-method", text: /GET/).text
  #   assert_equal "5", find_by_id("stat-counter", text: /5/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  # end

  # test "submit reflex-form once" do
  #   visit demo_url("increment")

  #   fingerprint = find_by_id("stat-fingerprint").text
  #   assert_equal "0", find_by_id("stat-counter", text: /0/).text

  #   find_by_id("reflex-form-submit").click

  #   assert_equal "POST", find_by_id("stat-method", text: /POST/).text
  #   assert_equal "1", find_by_id("stat-counter", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  # end

  # test "click reflex-form 5 times" do
  #   visit demo_url("increment")

  #   fingerprint = find_by_id("stat-fingerprint").text
  #   assert_equal "0", find_by_id("stat-counter", text: /0/).text

  #   5.times { find_by_id("reflex-form-submit").click }

  #   assert_equal "POST", find_by_id("stat-method", text: /POST/).text
  #   assert_equal "5", find_by_id("stat-counter", text: /5/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  # end
end
