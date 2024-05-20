# frozen_string_literal: true

require "test_helper"

class TurboBoost::Commands::StateStoreTest < ActiveSupport::TestCase
  setup do
    @store = TurboBoost::Commands::StateStore.new
  end

  test "initialize" do
    assert_kind_of ActiveSupport::Cache::MemoryStore, @store
    assert_kind_of Enumerable, @store
  end

  test "write and read" do
    @store.write :key, "value"
    assert_equal "value", @store.read(:key)
  end

  test "write and read with expiration" do
    @store.write :key, "value", expires_in: 1.seconds
    assert_equal "value", @store.read(:key)
    travel_to 2.seconds.from_now do
      assert_nil @store.read(:key)
    end
  end

  test "write and read with brackets" do
    @store[:key] = "value"
    assert_equal "value", @store[:key]
  end

  test "indifferent access" do
    @store[:key] = "value"
    assert_equal "value", @store["key"]
  end

  test "to_h" do
    @store.write :a, {b: {c: "value"}}
    expected = {a: {b: {c: "value"}}}.with_indifferent_access
    actual = @store.to_h
    assert_kind_of HashWithIndifferentAccess, actual
    assert_equal expected, actual
  end

  test "dig" do
    @store.write :a, {b: {c: "value"}}
    assert_equal "value", @store.dig(:a, :b, :c)
  end

  test "merge!" do
    @store.merge! a: 1, b: 2, c: 3
    assert_equal 1, @store[:a]
    assert_equal 2, @store[:b]
    assert_equal 3, @store[:c]
  end

  test "to_uid" do
    @store.write :a, {b: {c: "value"}}
    actual = @store.to_uid
    assert_kind_of URI::UID, @store.to_uid
    assert_equal "CweAgaFhgaFigaFjpXZhbHVlAw", actual.payload
  end

  test "to_gid" do
    @store.write :a, {b: {c: "value"}}
    expected = "gid://dummy/UniversalID::Extensions::GlobalIDModel/CweAgaFhgaFigaFjpXZhbHVlAw"
    actual = @store.to_gid
    assert_kind_of GlobalID, actual
    assert_equal expected, actual.to_s
  end

  test "to_gid_param" do
    @store.write :a, {b: {c: "value"}}
    expected = "Z2lkOi8vZHVtbXkvVW5pdmVyc2FsSUQ6OkV4dGVuc2lvbnM6Okdsb2JhbElETW9kZWwvQ3dlQWdhRmhnYUZpZ2FGanBYWmhiSFZsQXc"
    actual = @store.to_gid_param
    assert_equal expected, actual.to_s
  end

  test "initialize with gid" do
    @store.write :a, {b: {c: "value"}}
    gid = @store.to_gid
    expected = {a: {b: {c: "value"}}}.with_indifferent_access
    assert_equal expected, TurboBoost::Commands::StateStore.new(gid).to_h
  end

  test "initialize with gid param" do
    @store.write :a, {b: {c: "value"}}
    gid_param = @store.to_gid_param
    expected = {a: {b: {c: "value"}}}.with_indifferent_access
    assert_equal expected, TurboBoost::Commands::StateStore.new(gid_param).to_h
  end

  test "to_sgid" do
    @store.write :a, {b: {c: "value"}}
    actual = @store.to_sgid
    assert_kind_of SignedGlobalID, actual
  end

  test "initialize with sgid" do
    @store.write :a, {b: {c: "value"}}
    sgid = @store.to_sgid
    expected = {a: {b: {c: "value"}}}.with_indifferent_access
    assert_equal expected, TurboBoost::Commands::StateStore.new(sgid).to_h
  end

  test "initialize with sgid param" do
    @store.write :a, {b: {c: "value"}}
    sgid_param = @store.to_sgid_param
    expected = {a: {b: {c: "value"}}}.with_indifferent_access
    assert_equal expected, TurboBoost::Commands::StateStore.new(sgid_param).to_h
  end

  test "sgid expiration" do
    @store.write :a, {b: {c: "value"}}
    sgid = @store.to_sgid
    travel_to 2.days.from_now do
      assert_empty TurboBoost::Commands::StateStore.new(sgid).to_h
    end
  end

  test "sgid param expiration" do
    @store.write :a, {b: {c: "value"}}
    sgid_param = @store.to_sgid_param
    travel_to 2.days.from_now do
      assert_empty TurboBoost::Commands::StateStore.new(sgid_param).to_h
    end
  end
end
