# frozen_string_literal: true

class TurboBoost::Commands::StateStore < ActiveSupport::Cache::MemoryStore
  include Enumerable

  SGID_PURPOSE = name.dup.freeze

  def initialize(payload = {})
    super(expires_in: 1.day, size: 16.kilobytes)

    begin
      payload = URI::UID.from_sgid(payload, for: SGID_PURPOSE)&.decode if payload.is_a?(String)
      payload ||= URI::UID.from_gid(payload, for: SGID_PURPOSE)&.decode if payload.is_a?(String)
    rescue => error
      Rails.logger.error "Failed to decode URI::UID when creating a TurboBoost::Commands::StateStore! #{error.message}"
      payload = {}
    end

    merge! payload
  end

  alias_method :[], :read
  alias_method :[]=, :write

  def to_h
    (@data || {}).each_with_object({}) do |(key, entry), memo|
      memo[key] = entry.value
    end
  end

  delegate :each, :dig, to: :to_h

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
