# frozen_string_literal: true

require "test_helper"

class AttributeHydrationTest < ActiveSupport::TestCase
  include TurboBoost::Commands::AttributeHydration

  test "dehydration" do
    attributes = {string: "value", integer: 123, boolean: true}.with_indifferent_access
    dehydrated = dehydrate(attributes)
    assert_equal attributes, dehydrated
  end

  test "dehydration with a GlobalID value" do
    attributes = {user: User.first}.with_indifferent_access
    dehydrated = dehydrate(attributes)
    assert dehydrated[:user].is_a?(String)
  end

  test "dehydration with nested hash containing a GlobalID object" do
    attributes = {locals: {user: User.first}}.with_indifferent_access
    dehydrated = dehydrate(attributes)
    assert dehydrated[:locals].is_a?(String)

    locals = JSON.parse(dehydrated[:locals], symbolize_names: true)
    assert locals.is_a?(Hash)
    assert locals[:user].is_a?(String)
  end

  test "hydration" do
    attributes = {string: "value", integer: 123, boolean: true}.with_indifferent_access
    dehydrated = dehydrate(attributes)
    hydrated = hydrate(dehydrated)
    assert_equal attributes, hydrated
  end

  test "hydration with a GlobalID value" do
    attributes = {user: User.first}.with_indifferent_access
    dehydrated = dehydrate(attributes)
    hydrated = hydrate(dehydrated)
    assert_equal attributes, hydrated
  end

  test "hydration with nested hash containing a GlobalID object" do
    attributes = {locals: {user: User.first}}.with_indifferent_access
    dehydrated = dehydrate(attributes)
    hydrated = hydrate(dehydrated)
    assert_equal attributes, hydrated
  end
end
