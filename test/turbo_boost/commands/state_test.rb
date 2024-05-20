# frozen_string_literal: true

require "test_helper"

class TurboBoost::Commands::StateTest < ActiveSupport::TestCase
  test "now" do
    state = TurboBoost::Commands::State.new
    assert_kind_of HashWithIndifferentAccess, state.now
    assert_empty state.now
  end

  test "now with values" do
    state = TurboBoost::Commands::State.new
    state.now[:key] = "value"
    assert_equal "value", state.now[:key]
  end

  test "page" do
    state = TurboBoost::Commands::State.new
    assert_kind_of HashWithIndifferentAccess, state.page
    assert_empty state.page
  end

  test "page with values" do
    state = TurboBoost::Commands::State.new
    state.page[:key] = "value"
    assert_equal "value", state.page[:key]
  end

  test "signed" do
    state = TurboBoost::Commands::State.new
    assert_kind_of TurboBoost::Commands::StateStore, state.signed
    assert_empty state.signed.to_h
  end

  test "signed with values" do
    state = TurboBoost::Commands::State.new
    state.signed[:key] = "value"
    assert_equal "value", state.signed[:key]
  end

  test "delegates missing to signed" do
    state = TurboBoost::Commands::State.new
    state.signed[:a] = 1
    state[:b] = 2
    assert_equal 1, state[:a]
    assert_equal 2, state.signed[:b]
  end

  test "current with values" do
    state = TurboBoost::Commands::State.new
    state[:a] = 1
    state.now[:b] = 2
    assert_equal 1, state.current[:a]
    assert_equal 2, state.current[:b]
  end

  test "cache_key" do
    state = TurboBoost::Commands::State.new
    assert_equal "TurboBoost::Commands::State/mZFLkyvTelC5g8XnyQrpOw==", state.cache_key
  end

  test "cache_key with values" do
    state = TurboBoost::Commands::State.new
    state[:a] = "foo"
    state[:b] = "bar"
    assert_equal "TurboBoost::Commands::State/8tCoYhaQyQn3uuW/t6+R1g==", state.cache_key
  end

  test "cache_key with now values" do
    state = TurboBoost::Commands::State.new
    state[:a] = "foo"
    state[:b] = "bar"
    state.now[:c] = "baz"
    assert_equal "TurboBoost::Commands::State/MQtKVwc4zxFndIIVpzDcsQ==", state.cache_key
  end

  test "cache_key with page values" do
    state = TurboBoost::Commands::State.new
    state[:a] = "foo"
    state[:b] = "bar"
    state.now[:c] = "baz"
    state.page[:dom_id] = {a: 1, b: 2, "aria-test": "foo", "data-test": "bar"}
    assert_equal "TurboBoost::Commands::State/MOSYI9EFo6uN5FHq0+kU5w==", state.cache_key
  end

  test "to_json" do
    state = TurboBoost::Commands::State.new
    actual = JSON.parse(state.to_json)
    assert_equal %w[signed unsigned], actual.keys
    assert_empty actual["unsigned"]
    assert_operator actual["signed"].length, :>, 100
  end

  test "to_json with values" do
    state = TurboBoost::Commands::State.new
    state[:key] = "value"
    actual = JSON.parse(state.to_json)
    assert_equal %w[signed unsigned], actual.keys
    assert_equal "value", actual.dig("unsigned", "key")
    assert_operator actual["signed"].length, :>, 100
  end

  test "now not included in to_json" do
    state = TurboBoost::Commands::State.new
    state[:a] = 1
    state.now[:b] = 2
    actual = JSON.parse(state.to_json)
    assert actual["unsigned"].key?("a")
    assert_equal 1, actual["unsigned"]["a"]
    refute actual["unsigned"].key?("b")
  end

  test "tag_options" do
    state = TurboBoost::Commands::State.new
    assert_equal({}, state.tag_options)
  end

  test "tag_options with hash" do
    state = TurboBoost::Commands::State.new
    assert_equal({key: "value"}, state.tag_options({key: "value"}))
  end

  test "tag_options with hash and duplicates" do
    state = TurboBoost::Commands::State.new
    assert_equal({key: "value"}, state.tag_options({:key => "value", "key" => "value"}))
  end

  test "tag_options with hash and empty turbo_boost" do
    state = TurboBoost::Commands::State.new
    assert_equal({key: "value"}, state.tag_options({key: "value", turbo_boost: {}}))
  end

  test "tag_options with hash and invalid turbo_boost" do
    state = TurboBoost::Commands::State.new
    assert_equal({key: "value"}, state.tag_options({key: "value", turbo_boost: {invalid: "value"}}))
  end

  test "tag_options with hash and turbo_boost remember without id" do
    state = TurboBoost::Commands::State.new
    assert_raises(TurboBoost::Commands::StateError) do
      state.tag_options({key: "value", turbo_boost: {remember: %w[foo bar].to_json}})
    end
  end

  test "tag_options with hash and turbo_boost remember with id and page state" do
    state = TurboBoost::Commands::State.new

    # setup page state for an element
    state.page[:dom_id] = {a: 1, b: 2, "aria-test": "foo", "data-test": "bar"}

    # TagHelper options used to render an HTML tag
    options = {
      id: "dom_id",
      turbo_boost: {remember: %w[a b aria-test data-test].to_json}
    }

    # expected tag options after being expanded by TurboBoost::Commands::State
    expected = {
      id: "dom_id",
      a: 1,
      b: 2,
      aria: {test: "foo"},
      data: {turbo_boost_state_attributes: "[\"a\",\"b\",\"aria-test\",\"data-test\"]", test: "bar"}
    }

    assert_equal expected, state.tag_options(options)
  end
end
