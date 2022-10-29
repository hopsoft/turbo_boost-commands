# frozen_string_literal: true

require "observer"

class TurboReflex::Cargo
  include Observable

  class << self
    def serialize_base64(data)
      Base64.urlsafe_encode64 data.to_json, padding: false
    end

    def deserialize_base64(string)
      return {} if string.blank?
      JSON.parse Base64.urlsafe_decode64(string)
    end

    def serialize(data)
      dump = Marshal.dump(data)
      deflated = Zlib::Deflate.deflate(dump, Zlib::BEST_COMPRESSION)
      Base64.urlsafe_encode64 deflated
    end

    def deserialize(string)
      return {} if string.blank?
      decoded = Base64.urlsafe_decode64(string)
      inflated = Zlib::Inflate.inflate(decoded)
      Marshal.load inflated
    end
  end

  def initialize(ordinal_payload = nil)
    @internal_keys = []
    @internal_data = {}

    self.class.deserialize(ordinal_payload).each do |(key, value)|
      write key, value
    end
  end

  delegate :size, to: :internal_data

  def cache_key
    "turbo-reflex/ui-state/#{Digest::MD5.base64digest payload}"
  end

  def read(*keys, default: nil)
    value = internal_data[key_for(*keys)]
    value = write(*keys, default) if value.nil? && default
    value
  end

  def write(*keys, value)
    key = key_for(*keys)
    orig_value = read(key)
    internal_keys.delete key if internal_keys.include?(key)
    internal_keys << key
    internal_data[key] = value
    notify_observers :change, {key => {from: orig_value, to: value}}
    value
  end

  def payload
    self.class.serialize_base64 internal_data
  end

  def ordinal_payload
    self.class.serialize internal_list
  end

  def shrink!
    @internal_data = shrink(internal_data)
    @internal_keys = internal_keys & internal_data.keys
  end

  def prune!(max_bytesize: 2.kilobytes)
    return if internal_keys.blank?
    return if internal_data.blank?

    while ordinal_payload.bytesize > max_bytesize
      internal_data.delete internal_keys.shift
    end
  end

  private

  attr_reader :internal_keys
  attr_reader :internal_data

  def internal_list
    internal_keys.map { |key| [key, internal_data[key]] }
  end

  def key_for(*keys)
    keys.map { |key| key.try(:cache_key) || key.to_s }.join("/")
  end

  def shrink(obj)
    case obj
    when Array
      obj.each_with_object([]) do |value, memo|
        value = shrink(value)
        memo << value if value.present?
      end
    when Hash
      obj.each_with_object({}) do |(key, value), memo|
        value = shrink(value)
        memo[key] = value if value.present?
      end
    else
      obj
    end
  end
end
