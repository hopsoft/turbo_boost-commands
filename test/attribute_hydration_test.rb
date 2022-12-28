# frozen_string_literal: true

require "test_helper"

class AttributeHydrationTest < ActiveSupport::TestCase
  include TurboBoost::Commands::AttributeHydration
  test "simple dehydration" do
    attributes = {a: "a-value", b: "b-value"}.with_indifferent_access
    assert_equal attributes, dehydrate(attributes)
  end
end
