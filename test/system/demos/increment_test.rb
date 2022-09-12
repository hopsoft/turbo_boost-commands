# frozen_string_literal: true

require "application_system_test_case"

class IncrementTest < ApplicationSystemTestCase
  test "click standard-link" do
    visit demo_url("increment")

    fingerprint = find_by_id("stat-fingerprint").text
    assert_equal "0", find_by_id("stat-counter", text: /0/).text

    find_by_id("standard-link").click

    assert_equal "GET", find_by_id("stat-method", text: /GET/).text
    assert_equal "0", find_by_id("stat-counter", text: /0/).text
    assert_not_equal fingerprint, find_by_id("stat-fingerprint")
  end

  test "click reflex-link once" do
    visit demo_url("increment")

    fingerprint = find_by_id("stat-fingerprint").text
    assert_equal "0", find_by_id("stat-counter", text: /0/).text

    find_by_id("reflex-link").click

    assert_equal "GET", find_by_id("stat-method", text: /GET/).text
    assert_equal "1", find_by_id("stat-counter", text: /1/).text
    assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  end

  test "click reflex-link 5 times" do
    visit demo_url("increment")

    fingerprint = find_by_id("stat-fingerprint").text
    assert_equal "0", find_by_id("stat-counter", text: /0/).text

    5.times { find_by_id("reflex-link").click }

    assert_equal "GET", find_by_id("stat-method", text: /GET/).text
    assert_equal "5", find_by_id("stat-counter", text: /5/).text
    assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  end

  test "click reflex-button once" do
    visit demo_url("increment")

    fingerprint = find_by_id("stat-fingerprint").text
    assert_equal "0", find_by_id("stat-counter", text: /0/).text

    find_by_id("reflex-button").click

    assert_equal "GET", find_by_id("stat-method", text: /GET/).text
    assert_equal "1", find_by_id("stat-counter", text: /1/).text
    assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  end

  test "click reflex-button 5 times" do
    visit demo_url("increment")

    fingerprint = find_by_id("stat-fingerprint").text
    assert_equal "0", find_by_id("stat-counter", text: /0/).text

    5.times { find_by_id("reflex-button").click }

    assert_equal "GET", find_by_id("stat-method", text: /GET/).text
    assert_equal "5", find_by_id("stat-counter", text: /5/).text
    assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  end

  test "submit reflex-form once" do
    visit demo_url("increment")

    fingerprint = find_by_id("stat-fingerprint").text
    assert_equal "0", find_by_id("stat-counter", text: /0/).text

    find_by_id("reflex-form-submit").click

    assert_equal "POST", find_by_id("stat-method", text: /POST/).text
    assert_equal "1", find_by_id("stat-counter", text: /1/).text
    assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  end

  test "click reflex-form 5 times" do
    visit demo_url("increment")

    fingerprint = find_by_id("stat-fingerprint").text
    assert_equal "0", find_by_id("stat-counter", text: /0/).text

    5.times { find_by_id("reflex-form-submit").click }

    assert_equal "POST", find_by_id("stat-method", text: /POST/).text
    assert_equal "5", find_by_id("stat-counter", text: /5/).text
    assert_not_equal fingerprint, find_by_id("stat-fingerprint").text
  end
end
