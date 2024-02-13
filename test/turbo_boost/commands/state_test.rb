# frozen_string_literal: true

require "test_helper"

class TurboBoost::Commands::StateTest < ActiveSupport::TestCase
  test "new with expiration" do
    state = TurboBoost::Commands::State.new(ActiveSupport::Cache::MemoryStore.new(expires_in: 1.second))
    state.write :example, "value"
    assert_equal "value", state.read(:example)
    travel 2.seconds
    assert_nil state.read(:example)
  end

  test "new with size" do
    state = TurboBoost::Commands::State.new(ActiveSupport::Cache::MemoryStore.new(size: 4.kilobytes))
    state.write :example, "0" * 4097.bytes
    assert_nil state.read(:example)
    assert_empty state.to_h
  end

  test "fetch" do
    state = TurboBoost::Commands::State.new
    assert_equal "value", state.fetch(:example) { "value" }
  end

  test "read and write" do
    state = TurboBoost::Commands::State.new
    state.write :example, "value"
    assert_equal "value", state.read(:example)
  end

  test "read [] and write []= " do
    state = TurboBoost::Commands::State.new
    state[:example] = "value"
    assert_equal "value", state[:example]
  end

  test "read and write with expiration" do
    state = TurboBoost::Commands::State.new
    state.write :example, "value", expires_in: 1.second
    assert_equal "value", state.read(:example)
    travel 2.seconds
    assert_nil state.read(:example)
    assert_empty state.to_h
  end

  test "to_h" do
    state = TurboBoost::Commands::State.new
    state.write :example, "value"
    expected = {"example" => "value"}
    assert_equal expected, state.to_h
  end

  test "to_sgid_param and from_sgid_param" do
    state = TurboBoost::Commands::State.new
    state.write :example, "value"
    sgid = state.to_sgid_param
    restored = TurboBoost::Commands::State.from_sgid_param(sgid)
    assert_equal "value", restored.read(:example)
  end

  test "state.now cannot have a now" do
    state = TurboBoost::Commands::State.new
    assert_instance_of TurboBoost::Commands::State, state
    assert_instance_of TurboBoost::Commands::State, state.now
    assert_nil state.now.now
  end
end
