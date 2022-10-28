# frozen_string_literal: true

# Class used to hold ephemeral state related to the rendered UI.
#
# Examples:
#
# - Sidebar open/closed state
# - Tree view open/closed state
# - Accordion collapsed/expanded state
# - Customized layout / presentation
# - Applied data filters
# - Number of data rows to display etc.
#
class TurboReflex::State
  include ActiveModel::Dirty

  class << self
    def serialize(data, deflate: false)
      return Base64.urlsafe_encode64(data.to_hash.to_json, padding: false) unless deflate

      dump = Marshal.dump(data)
      deflated = Zlib::Deflate.deflate(dump)
      Base64.urlsafe_encode64 deflated
    end

    def deserialize(string, inflate: false)
      return {} if string.blank?
      return JSON.parse(Base64.urlsafe_decode64(string)) unless inflate

      decoded = Base64.urlsafe_decode64(string)
      inflated = Zlib::Inflate.inflate(decoded)
      Marshal.load inflated
    rescue => e
      Rails.logger.error "TurboReflex was unable to deserialize UI State! string=#{string.inspect} error=#{e.inspect}"
      {}
    end

    def key_for(*keys)
      keys.map { |key| key.try(:cache_key) || key.to_s }.join("/")
    end
  end

  # For ActiveModel::Dirty tracking
  attr_reader :cache
  define_attribute_methods :cache

  delegate :key_for, to: :"self.class"
  delegate :request, :response, to: :"runner.controller"

  def initialize(runner)
    @runner = runner

    # Local in-memory cache with LRU eviction
    # TODO: Use a size-constrained local cache with real LRU eviction (perhaps https://github.com/SamSaffron/lru_redux)
    #
    # Cache data will be stored in an HTTP cookie so maintaining a small size is critical.
    # We optimize size during serialization but should explore more ideas to help limit size.
    #
    # Some ideas to explore
    # - [ ] Shorten key length and store translation in DOM on the turbo-reflex meta element
    # - [ ] Remove blank values (might cause unexpected behavior)
    # - [ ] Abandon cookies and only use DOM state sent to server as HTTP headers (confines state awareness to reflexes)
    #
    @cache = ActiveSupport::Cache::MemoryStore.new(size: 16.kilobytes)
    # WARNING: Using internals of ActiveSupport::Cache::MemoryStore
    cache.instance_variable_set :@data, cookie_data
    cache.cleanup
    # cache.prune 16.kilobytes # NOTE: don't call this because MemoryStore isn't actually LRU
  end

  def [](*keys)
    cache.read key_for(*keys)
  end

  def []=(*keys, value)
    cache_will_change! if value != self[*keys]
    cache.write key_for(*keys), value, expires_at: 1.day.from_now
    value
  end

  def fetch(*keys, default)
    value = self[*keys]
    value = self[*keys] = default if value.nil? && default
    value
  end

  def cache_key
    "turbo-reflex/ui-state/#{Digest::MD5.base64digest data(minimal: true).to_s}"
  end

  def serialize(deflate: false, minimal: false)
    self.class.serialize data(minimal: minimal), deflate: deflate
  end

  def set_cookie
    return unless changed?
    response.set_cookie "turbo_reflex_state", value: serialize(deflate: true)
    changes_applied
  end

  private

  attr_reader :runner

  # WARNING: Using internals of ActiveSupport::Cache::MemoryStore
  def data(minimal: false)
    d = cache.instance_variable_get(:@data)
    return cache.read_multi(*d.keys) if minimal
    d.deep_dup
  end

  def headers
    request.headers.select { |(key, _)| key.match?(/TURBOREFLEX_STATE/i) }.sort
  end

  # State that exists on the client.
  def header_data
    value = headers.map(&:last).join
    value.present? ? self.class.deserialize(value) : {}
  end

  # State that the server last rendered with.
  def cookie_data
    self.class.deserialize request.cookies["turbo_reflex_state"], inflate: true
  end
end
