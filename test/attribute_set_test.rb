# frozen_string_literal: true

require "test_helper"

class AttributeSetTest < ActiveSupport::TestCase
  include TurboBoost::Commands::AttributeHydration

  test "prefix selection" do
    attributes = {test_a: "included", b: "excluded"}
    attrs = TurboBoost::Commands::AttributeSet.new(attributes, prefix: :test)
    assert_equal "included", attrs.a
    assert_nil attrs.b
  end

  test "presence check" do
    attributes = {test_a: "value", test_b: ""}
    attrs = TurboBoost::Commands::AttributeSet.new(attributes, prefix: :test)
    assert attrs.a?
    refute attrs.b?
  end

  test "boolean type coercion" do
    attributes = {test_a: "true", test_b: "false"}
    attrs = TurboBoost::Commands::AttributeSet.new(attributes, prefix: :test)
    assert attrs.a?
    assert_equal true, attrs.a
    refute attrs.b?
    assert_equal false, attrs.b
  end

  test "integer type coercion" do
    attributes = {test_a: "54872"}
    attrs = TurboBoost::Commands::AttributeSet.new(attributes, prefix: :test)
    assert attrs.a?
    assert attrs.a.is_a? Numeric
    assert_equal 54872, attrs.a
  end

  test "implicit hydration" do
    attributes = {test_a: "value", data: {locals: {user: User.first}}}.with_indifferent_access
    dehydrated = dehydrate(attributes)
    attrs = TurboBoost::Commands::AttributeSet.new(dehydrated)
    assert_equal attributes, attrs.to_h
  end
end
