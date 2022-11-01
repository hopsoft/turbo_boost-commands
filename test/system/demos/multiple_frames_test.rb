# frozen_string_literal: true

require "application_system_test_case"

class MultipleFramesTest < ApplicationSystemTestCase
  # # Frame 1 tests ............................................................................................
  # test "click reflex-link-this-frame-1 once" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-1").text
  #   assert_equal "0", find_by_id("stat-counter-1", text: /0/).text

  #   find_by_id("reflex-link-this-frame-1").click

  #   assert_equal "GET", find_by_id("stat-method-1", text: /GET/).text
  #   assert_equal "1", find_by_id("stat-counter-1", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-1").text
  # end

  # test "click reflex-link-this-frame-1 5 times" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-1").text
  #   assert_equal "0", find_by_id("stat-counter-1", text: /0/).text

  #   5.times { find_by_id("reflex-link-this-frame-1").click }

  #   assert_equal "GET", find_by_id("stat-method-1", text: /GET/).text
  #   assert_equal "5", find_by_id("stat-counter-1", text: /5/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-1").text
  # end

  # test "click reflex-link-other-frame-1 once" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-2").text
  #   assert_equal "0", find_by_id("stat-counter-2", text: /0/).text

  #   find_by_id("reflex-link-other-frame-1").click

  #   assert_equal "GET", find_by_id("stat-method-2", text: /GET/).text
  #   assert_equal "1", find_by_id("stat-counter-2", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-2").text
  # end

  # test "click reflex-link-other-frame-1 5 times" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-2").text
  #   assert_equal "0", find_by_id("stat-counter-2", text: /0/).text

  #   5.times { find_by_id("reflex-link-other-frame-1").click }

  #   assert_equal "GET", find_by_id("stat-method-2", text: /GET/).text
  #   assert_equal "5", find_by_id("stat-counter-2", text: /5/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-2").text
  # end

  # test "click reflex-button-1" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-1").text
  #   assert_equal "0", find_by_id("stat-counter-1", text: /0/).text

  #   find_by_id("reflex-link-this-frame-1").click

  #   assert_equal "1", find_by_id("stat-counter-1", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-1").text
  #   fingerprint = find_by_id("stat-fingerprint-1").text

  #   find_by_id("reflex-button-1").click

  #   assert_equal "GET", find_by_id("stat-method-1", text: /GET/).text
  #   assert_equal "0", find_by_id("stat-counter-1", text: /0/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-1").text
  # end

  # test "click reflex-form-1" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-2").text
  #   assert_equal "0", find_by_id("stat-counter-2", text: /0/).text

  #   find_by_id("reflex-link-this-frame-2").click

  #   assert_equal "1", find_by_id("stat-counter-2", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-2").text
  #   fingerprint = find_by_id("stat-fingerprint-2").text

  #   find_by_id("reflex-form-1-submit").click

  #   assert_equal "POST", find_by_id("stat-method-2", text: /POST/).text
  #   assert_equal "0", find_by_id("stat-counter-2", text: /0/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-2").text
  # end

  # # Frame 2 tests ............................................................................................
  # test "click reflex-link-this-frame-2 once" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-2").text
  #   assert_equal "0", find_by_id("stat-counter-2", text: /0/).text

  #   find_by_id("reflex-link-this-frame-2").click

  #   assert_equal "GET", find_by_id("stat-method-2", text: /GET/).text
  #   assert_equal "1", find_by_id("stat-counter-2", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-2").text
  # end

  # test "click reflex-link-this-frame-2 5 times" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-2").text
  #   assert_equal "0", find_by_id("stat-counter-2", text: /0/).text

  #   5.times { find_by_id("reflex-link-this-frame-2").click }

  #   assert_equal "GET", find_by_id("stat-method-2", text: /GET/).text
  #   assert_equal "5", find_by_id("stat-counter-2", text: /5/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-2").text
  # end

  # test "click reflex-link-other-frame-2 once" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-1").text
  #   assert_equal "0", find_by_id("stat-counter-1", text: /0/).text

  #   find_by_id("reflex-link-other-frame-2").click

  #   assert_equal "GET", find_by_id("stat-method-2", text: /GET/).text
  #   assert_equal "1", find_by_id("stat-counter-1", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-1").text
  # end

  # test "click reflex-link-other-frame-2 5 times" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-1").text
  #   assert_equal "0", find_by_id("stat-counter-1", text: /0/).text

  #   5.times { find_by_id("reflex-link-other-frame-2").click }

  #   assert_equal "GET", find_by_id("stat-method-2", text: /GET/).text
  #   assert_equal "5", find_by_id("stat-counter-1", text: /5/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-1").text
  # end

  # test "click reflex-button-2" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-2").text
  #   assert_equal "0", find_by_id("stat-counter-2", text: /0/).text

  #   find_by_id("reflex-link-this-frame-2").click

  #   assert_equal "1", find_by_id("stat-counter-2", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-2").text
  #   fingerprint = find_by_id("stat-fingerprint-2").text

  #   find_by_id("reflex-button-2").click

  #   assert_equal "GET", find_by_id("stat-method-2", text: /GET/).text
  #   assert_equal "0", find_by_id("stat-counter-2", text: /0/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-2").text
  # end

  # test "click reflex-form-2" do
  #   visit demo_url("multiple_frames")

  #   fingerprint = find_by_id("stat-fingerprint-1").text
  #   assert_equal "0", find_by_id("stat-counter-1", text: /0/).text

  #   find_by_id("reflex-link-this-frame-1").click

  #   assert_equal "1", find_by_id("stat-counter-1", text: /1/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-1").text
  #   fingerprint = find_by_id("stat-fingerprint-1").text

  #   find_by_id("reflex-form-2-submit").click

  #   assert_equal "POST", find_by_id("stat-method-1", text: /POST/).text
  #   assert_equal "0", find_by_id("stat-counter-1", text: /0/).text
  #   assert_not_equal fingerprint, find_by_id("stat-fingerprint-1").text
  # end
end
