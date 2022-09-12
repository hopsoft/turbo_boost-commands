# frozen_string_literal: true

require "application_system_test_case"

class IncrementTest < ApplicationSystemTestCase
  test "stanard link" do
    visit demo_url("increment")

    fingerprint = find_by_id("stat-fingerprint").text
    assert_equal "0", find_by_id("stat-counter").text

    find_by_id("standard-link").click

    assert_equal "0", find_by_id("stat-counter").text
    assert_not_equal fingerprint, find_by_id("stat-fingerprint")
  end

  # test "reflex link" do
  #   visit demo_url("increment")

  #   fingerprint = find_by_id("stat-fingerprint").text
  #   assert_equal "0", find_by_id("stat-counter").text

  #   find_by_id("reflex-link").click # system tests appear to ignore event capture

  #   assert_equal "1", find_by_id("stat-counter").text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint")
  # end
end
