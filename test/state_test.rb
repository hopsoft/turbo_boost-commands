# frozen_string_literal: true

require "test_helper"

class StateTest < ActiveSupport::TestCase
  test "new with defaults" do
    state = TurboBoost::State.new
    assert_respond_to state, :clear
    assert_respond_to state, :decrement
    assert_respond_to state, :fetch
    assert_respond_to state, :increment
    assert_respond_to state, :read
    assert_respond_to state, :write
  end

  test "new with expiration" do
    state = TurboBoost::State.new(ActiveSupport::Cache::MemoryStore.new(expires_in: 1.second))
    state.write :example, "value"
    assert_equal "value", state.read(:example)
    sleep 1
    assert_nil state.read(:example)
  end

  test "new with size" do
    state = TurboBoost::State.new(ActiveSupport::Cache::MemoryStore.new(size: 4.kilobytes))
    state.write :example, "0" * 4097.bytes
    assert_nil state.read(:example)
  end

  test "fetch" do
    state = TurboBoost::State.new
    assert_equal "value", state.fetch(:example) { "value" }
  end

  test "read and write" do
    state = TurboBoost::State.new
    state.write :example, "value"
    assert_equal "value", state.read(:example)
  end

  test "read and write with expiration" do
    state = TurboBoost::State.new
    state.write :example, "value", expires_in: 1.second
    assert_equal "value", state.read(:example)
    sleep 1
    assert_nil state.read(:example)
  end

  test "to_h" do
    state = TurboBoost::State.new
    state.write :example, "value"
    expected = {"example" => "value"}
    assert_equal expected, state.to_h
  end

  test "to_sgid and from_sgid" do
    state = TurboBoost::State.new
    state.write :example, "value"
    sgid = state.to_sgid_param
    restored = TurboBoost::State.from_sgid_param(sgid)
    assert_equal "value", restored.read(:example)
  end
end
