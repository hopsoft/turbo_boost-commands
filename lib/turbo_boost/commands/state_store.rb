# frozen_string_literal: true

class TurboBoost::Commands::StateStore < ActiveSupport::Cache::MemoryStore
  include Enumerable

  class NoCoder
    def dump(value)
      value
    end

    def load(value)
      value
    end
  end

  SGID_PURPOSE = name.dup.freeze

  def initialize(payload = {})
    super(coder: NoCoder.new, compress: false, expires_in: 1.day, size: 16.kilobytes)

    begin
      payload = case payload
      when SignedGlobalID then URI::UID.from_sgid(payload, for: SGID_PURPOSE)&.decode
      when GlobalID then URI::UID.from_gid(payload)&.decode
      when String then URI::UID.from_sgid(payload, for: SGID_PURPOSE)&.decode || URI::UID.from_gid(payload, for: SGID_PURPOSE)&.decode
      else payload
      end
    rescue => error
      Rails.logger.error "Failed to decode URI::UID when creating a TurboBoost::Commands::StateStore! #{error.message}"
      payload = {}
    end

    merge! payload
  end

  alias_method :[], :read
  alias_method :[]=, :write

  def to_h
    @data
      .each_with_object({}) { |(key, entry), memo| memo[key] = entry.value }
      .with_indifferent_access
  end

  delegate :dig, :each, to: :to_h

  def merge!(other = {})
    other.to_h.each { |key, val| write key, val }
    self
  end

  def to_uid
    cleanup
    URI::UID.build to_h, include_blank: false
  end

  def to_gid
    to_uid.to_gid
  end

  def to_gid_param
    to_gid.to_param
  end

  def to_sgid
    to_uid.to_sgid for: SGID_PURPOSE, expires_in: 1.day
  end

  def to_sgid_param
    to_sgid.to_param
  end
end
