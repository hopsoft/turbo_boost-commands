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
class TurboReflex::UiState
  class << self
    def serialize(hash)
      Base64.urlsafe_encode64 Marshal.dump(hash.to_hash), padding: false
    end

    def deserialize(value)
      Marshal.load Base64.urlsafe_decode64(value)
    end

    def key_for(*keys)
      key = keys.map { |key| key.try(:cache_key) || key.try(:to_gid_param) || key.to_s }.join("/")
      Digest::MD5.base64digest key
    end
  end

  attr_reader :hash
  delegate :key_for, to: :"self.class"

  def initialize(request)
    headers = request.headers.select { |(key, _)| key.match?(/TURBOREFLEX_UISTATE/i) }.sort
    value = headers.map(&:last).join
    hash = value.present? ? self.class.deserialize(value) : {}
    self.hash = hash
  end

  def hash=(hash)
    @hash = hash.with_indifferent_access
  end

  def [](*keys)
    hash[key_for(*keys)]
  end

  def []=(*keys, value)
    hash[key_for(*keys)] = value
    value
  end

  def fetch(*keys, default)
    value = self[*keys]
    value = self[*keys] = default if value.nil? && default
    value
  end

  def serialize
    self.class.serialize hash
  end
end
