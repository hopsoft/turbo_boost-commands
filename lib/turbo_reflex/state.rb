# frozen_string_literal: true

class TurboReflex::State
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
    @internal_data = {}.with_indifferent_access

    self.class.deserialize(ordinal_payload).each do |(key, value)|
      write key, value
    end
  end

  delegate :size, to: :internal_data
  delegate :include?, :has_key?, :key?, :member?, to: :internal_data

  def cache_key
    "turbo-reflex/ui-state/#{Base64.urlsafe_encode64 Digest::MD5.hexdigest(payload), padding: false}"
  end

  def read(*keys, default: nil)
    value = internal_data[key_for(*keys)]
    value = write(*keys, default) if value.nil? && default
    value
  end

  def write(*keys, value)
    key = key_for(*keys)
    internal_keys.delete key if internal_keys.include?(key)
    internal_keys << key
    internal_data[key] = value
    value
  end

  def payload
    self.class.serialize_base64 internal_data
  end

  def ordinal_payload
    self.class.serialize internal_list
  end

  def shrink!
    @internal_data = shrink(internal_data).with_indifferent_access
    @internal_keys = internal_keys & internal_data.keys
  end

  def prune!(max_bytesize: 2.kilobytes)
    return if internal_keys.blank?
    return if internal_data.blank?

    percentage = max_bytesize > 0 ? ordinal_payload.bytesize / max_bytesize.to_f : 0
    while percentage > 1
      keys_to_keep = internal_keys.slice((internal_keys.length - (internal_keys.length / percentage).floor)..-1)
      keys_to_remove = internal_keys - keys_to_keep
      @internal_keys = keys_to_keep
      keys_to_remove.each { |key| internal_data.delete key }
      percentage = max_bytesize > 0 ? ordinal_payload.bytesize / max_bytesize.to_f : 0
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
      obj.each_with_object({}.with_indifferent_access) do |(key, value), memo|
        value = shrink(value)
        memo[key] = value if value.present?
      end
    else
      obj
    end
  end
end
