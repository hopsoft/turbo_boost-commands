# frozen_string_literal: true

require "test_helper"

class StateTest < ActiveSupport::TestCase
  test "empty state" do
    state = TurboReflex::State.new
    assert_equal 0, state.size
    assert_equal 3, state.payload.bytesize
    assert_equal 16, state.ordinal_payload.bytesize

    assert_equal "e30", state.payload
    assert_equal "eNpj4YhmAAAA4gBo", state.ordinal_payload
  end

  test "cache_key" do
    state = TurboReflex::State.new
    state.write :a, true
    assert_equal "turbo-reflex/ui-state/t9zHl5rxmtVcEVvkRm8V08/3+rhLXTcgP7FUbCJMm34=", state.cache_key

    state.write :b, true
    assert_equal "turbo-reflex/ui-state/0OLmXON76R7B0VSh/mGsELbUQwtPwdhz+TbLg6Xn+1g=", state.cache_key
  end

  test "read and write" do
    state = TurboReflex::State.new
    state.write :example, "value"
    assert state.key?(:example)
    assert_equal "value", state.read(:example)
  end

  test "shrink! removes falsy and blank entries" do
    state = TurboReflex::State.new
    state.write :a, false
    state.write :b, ""
    state.write :c, "   "
    state.write :d, []
    state.write :e, {}
    state.write :f, nil

    assert_equal 68, state.payload.bytesize
    assert_equal 144, state.ordinal_payload.bytesize

    state.shrink!

    assert_equal 3, state.payload.bytesize
    assert_equal 16, state.ordinal_payload.bytesize

    refute state.key? :a
    refute state.key? :b
    refute state.key? :c
    refute state.key? :d
    refute state.key? :e
    refute state.key? :f
  end

  test "shrink! removes nested falsy and blank entries" do
    state = TurboReflex::State.new
    state.write :a, [true, 1, nil, {x: nil, y: [], z: nil}]
    state.write :b, {x: true, y: 1, z: nil}

    assert_equal 102, state.payload.bytesize
    assert_equal 152, state.ordinal_payload.bytesize

    state.shrink!

    assert_equal 47, state.payload.bytesize
    assert_equal 124, state.ordinal_payload.bytesize

    assert_equal [true, 1], state.read(:a)
    assert state.read(:b).is_a?(HashWithIndifferentAccess)
    assert_equal({x: true, y: 1}.with_indifferent_access, state.read(:b))
  end

  test "prune! optimizes payload sizes (ordinal_payload is stored in an HTTP cookie)" do
    state = TurboReflex::State.new
    1000.times { state.write SecureRandom.uuid, SecureRandom.uuid }

    target_size = 2.kilobytes

    assert state.payload.bytesize > target_size
    assert state.ordinal_payload.bytesize > target_size

    last_payload_bytesize = state.payload.bytesize
    state.prune! max_bytesize: target_size

    assert state.payload.bytesize < last_payload_bytesize
    assert state.ordinal_payload.bytesize <= target_size

    target_size = 1.kilobytes

    assert state.payload.bytesize > target_size
    assert state.ordinal_payload.bytesize > target_size

    last_payload_bytesize = state.payload.bytesize
    state.prune! max_bytesize: target_size

    assert state.payload.bytesize < last_payload_bytesize
    assert state.ordinal_payload.bytesize <= target_size
  end
end
