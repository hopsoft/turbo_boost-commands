# frozen_string_literal: true

class TurboBoost::Commands::State
  include Enumerable

  class << self
    def from_sgid_param(sgid)
      new URI::UID.from_sgid(sgid, for: name)&.decode
    end

    attr_reader :resolver

    def assign_resolver(&block)
      @resolver = block
    end
  end

  def initialize(store = nil, parent: nil)
    @store = store || ActiveSupport::Cache::MemoryStore.new(expires_in: 1.day, size: 2.kilobytes)
    @store.cleanup
    @parent = parent
  end

  delegate :to_json, to: :to_h
  delegate_missing_to :store

  def each
    data.keys.each do |key|
      yield key, self[key]
    end
  end

  # TODO: implement state resolution
  def resolve(client_state)
    # return unless self.class.resolver
    # self.class.resolver.call self, client_state
  end

  def now
    @now ||= self.class.new(nil, parent: self)
  end

  def cache_key
    "TurboBoost::Commands::State/#{Digest::SHA2.base64digest(to_json)}"
  end

  def read(...)
    value = store.read(...)
    value = parent&.read(...) if value.nil?
    value
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

  attr_reader :store, :parent

  def data
    store.instance_variable_get(:@data) || {}
  end
end
