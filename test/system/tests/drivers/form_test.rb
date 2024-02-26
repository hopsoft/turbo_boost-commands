# frozen_string_literal: true

require_relative "../../../application_system_test_case"

class DriversFormTest < ApplicationSystemTestCase
  COUNT = 5

  test "command that PREVENTS the rails controller action from performing" do
    page.goto tests_url
    element(:form_driver).click

    wait_for_mutations_finished :form_driver_message do |el|
      assert_equal "...", el.inner_text
    end

    COUNT.times do
      wait_for_mutations :form_driver_message do
        element(:form_driver_prevent).click
      end
    end

    wait_for_mutations :form_driver_message do |el|
      assert_equal "PreventControllerActionCommand invoked #{COUNT} times", el.inner_text
    end
  end

  test "command that ALLOWS the rails controller action to perform" do
    page.goto tests_url
    element(:form_driver).click

    wait_for_mutations_finished :form_driver_message do |el|
      assert_equal "...", el.inner_text
    end

    COUNT.times do
      wait_for_mutations :form_driver_message do
        element(:form_driver_allow).click
      end
    end

    wait_for_mutations_finished :form_driver_message do |el|
      assert_equal "AllowControllerActionCommand invoked #{COUNT} times", el.inner_text
    end
  end
end
