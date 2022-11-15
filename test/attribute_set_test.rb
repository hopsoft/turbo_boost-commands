# frozen_string_literal: true

require "test_helper"

class AttributeSetTest < ActiveSupport::TestCase
  test "prefix selection" do
    attributes = {test_a: "included", b: "excluded"}
    attrs = TurboReflex::AttributeSet.new(:test, attributes: attributes)
    assert_equal "included", attrs.a
    assert_nil attrs.b
  end

  test "presence check" do
    attributes = {test_a: "value", test_b: ""}
    attrs = TurboReflex::AttributeSet.new(:test, attributes: attributes)
    assert attrs.a?
    refute attrs.b?
  end

  test "boolean type coercion" do
    attributes = {test_a: "true", test_b: "false"}
    attrs = TurboReflex::AttributeSet.new(:test, attributes: attributes)
    assert attrs.a?
    assert_equal true, attrs.a
    refute attrs.b?
    assert_equal false, attrs.b
  end

  test "integer type coercion" do
    attributes = {test_a: "54872"}
    attrs = TurboReflex::AttributeSet.new(:test, attributes: attributes)
    assert attrs.a?
    assert attrs.a.is_a? Numeric
    assert_equal 54872, attrs.a
  end
end
