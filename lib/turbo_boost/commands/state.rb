# frozen_string_literal: true

class TurboBoost::Commands::State
  include Enumerable

  class << self
    def from_sgid_param(sgid)
      new URI::UID.from_sgid(sgid, for: name)&.decode
    end
  end

  def initialize(store = nil, provisional: false)
    @store = store || ActiveSupport::Cache::MemoryStore.new(expires_in: 1.day, size: 16.kilobytes)
    @store.cleanup
    @provisional = provisional
  end

  delegate :to_json, to: :to_h
  delegate_missing_to :store

  def dig(*keys)
    to_h.with_indifferent_access.dig(*keys)
  end

  def merge!(hash = {})
    hash.to_h.each { |key, val| self[key] = val }
    self
  end

  def each
    data.keys.each do |key|
      yield key, self[key]
    end
  end

  # Provisional state is for the current request/response and is exposed as `State#now`
  # Standard state is preserved across multiple requests
  def provisional?
    !!@provisional
  end

  def now
    return nil if provisional? # provisional state cannot hold child provisional state
    @now ||= self.class.new(provisional: true)
  end

  def cache_key
    "TurboBoost::Commands::State/#{Digest::SHA2.base64digest(to_json)}"
  end

  def read(...)
    now&.read(...) || store.read(...)
  end

  def [](...)
    read(...)
  end

  def []=(...)
    write(...)
  end

  def to_sgid_param
    store.cleanup
    URI::UID.build(store, include_blank: false).to_sgid_param for: self.class.name, expires_in: 1.week
  end

  private

  attr_reader :store

  def data
    store.instance_variable_get(:@data) || {}
  end
end
