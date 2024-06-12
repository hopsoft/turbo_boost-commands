# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversFrameTest < ApplicationSystemTestCase
  COUNT = 5

  test "invalid User-Agent request" do
    page.goto tests_url

    element(:frame_driver).click

    wait_for_mutations_finished :frame_driver_message do |el|
      assert_equal "...", el.inner_text
    end

    response = nil
    page.on "response", ->(r) { response = r }

    wait_for_mutations_finished :frame_driver_message do |el|
      browser.contexts.first.set_extra_http_headers "User-Agent" => invalid_user_agent
      element(:frame_driver_prevent).click
    end

    Timeout.timeout(2) { sleep 0.05 until response }

    # untrusted xhr request should be intercepted and blocked by the middleware
    assert_equal 403, response.status
    assert_equal "Forbidden", response.status_text
    assert_equal "Forbidden", response.text

    assert_equal "...", element(:frame_driver_message).inner_text # DOM on the original page should be unchanged
  rescue Timeout::Error
    flunk "XHR response not intercepted!"
  end

  test "command that PREVENTS the rails controller action from performing" do
    page.goto tests_url
    element(:frame_driver).click

    wait_for_mutations_finished :frame_driver_message do |el|
      assert_equal "...", el.inner_text
    end

    COUNT.times do
      wait_for_mutations :frame_driver_message do
        element(:frame_driver_prevent).click
      end
    end

    wait_for_mutations_finished :frame_driver_message do |el|
      assert_equal "PreventControllerActionCommand invoked #{COUNT} times", el.inner_text
    end
  end

  test "command that ALLOWS the rails controller action to perform" do
    page.goto tests_url
    element(:frame_driver).click

    wait_for_mutations_finished :frame_driver_message do |el|
      assert_equal "...", el.inner_text
    end

    COUNT.times do
      wait_for_mutations :frame_driver_message do
        element(:frame_driver_allow).click
      end
    end

    wait_for_mutations :frame_driver_message do |el|
      assert_equal "AllowControllerActionCommand invoked #{COUNT} times", el.inner_text
    end
  end
end
