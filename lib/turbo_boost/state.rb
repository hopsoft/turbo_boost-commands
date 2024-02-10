# frozen_string_literal: true

class TurboBoost::State
  class << self
    def from_sgid_param(sgid)
      new URI::UID.from_sgid(sgid, for: name)&.decode
    end
  end

  def initialize(store = nil)
    @store = store || ActiveSupport::Cache::MemoryStore.new(expires_in: 1.week, size: 32.kilobytes)
    @store.cleanup
  end

  delegate_missing_to :store

  def to_h
    store.cleanup
    data.each_with_object(HashWithIndifferentAccess.new) do |(key, entry), memo|
      memo[key] = entry.value
    end
  end

  def to_json
    to_h.to_json
  end

  def to_sgid_param
    store.cleanup
    URI::UID.build(store).to_sgid_param for: self.class.name, expires_in: 1.week
  end

  private

  attr_reader :store

  def data
    store.instance_variable_get(:@data) || {}
  end
end
