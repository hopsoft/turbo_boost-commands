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
  include ActiveModel::Dirty

  class << self
    def serialize(hash, message_verifier: nil)
      return message_verifier.generate(hash.to_hash.to_json) if message_verifier
      Base64.urlsafe_encode64 hash.to_hash.to_json, padding: false
    end

    def deserialize(value, message_verifier: nil)
      return JSON.parse(message_verifier.verify(value)) if message_verifier&.valid_message?(value)
      JSON.parse Base64.urlsafe_decode64(value)
    rescue => e
      Rails.logger.error "TurboReflex was unable to deserialize UI State! value=#{value.inspect} error=#{e.inspect}"
      {}
    end

    def key_for(*keys)
      keys.map { |key| key.try(:cache_key) || key.to_s }.join("/")
    end
  end

  attr_reader :hash
  define_attribute_methods :hash
  delegate :key_for, to: :"self.class"
  delegate :message_verifier, to: :runner
  delegate :request, :response, to: :"runner.controller"

  def initialize(runner)
    @runner = runner
    self.hash = cookies_hash
  end

  def hash=(hash)
    @hash = hash.with_indifferent_access
  end

  def [](*keys)
    hash[key_for(*keys)]
  end

  def []=(*keys, value)
    hash_will_change! if value != self[*keys]
    hash[key_for(*keys)] = value
    value
  end

  def fetch(*keys, default)
    value = self[*keys]
    if value.nil? && default
      hash_will_change!
      value = self[*keys] = default
    end
    value
  end

  def serialize(signed: false)
    return self.class.serialize(hash, message_verifier: message_verifier) if signed
    self.class.serialize hash
  end

  def set_cookie
    return unless changed?
    cookies.each { |(key, _)| response.delete_cookie key.to_sym }
    serialized_chunks(signed: true).each_with_index do |chunk, index|
      key = :"turboreflex_uistate_#{index.to_s.rjust(6, "0")}"
      response.set_cookie key, value: chunk, expires: 2.weeks.from_now
    end
    changes_applied
  end

  private

  attr_reader :runner

  # UI state gets split into chunks and saved in an HTTP cookie.
  # Max size for an HTTP cookie is around 4k or 4,000 bytes.
  # A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  def serialized_chunks(signed: false)
    serialize(signed: signed).scan(/.{1,2000}/)
  end

  def headers
    request.headers.select { |(key, _)| key.match?(/TURBOREFLEX_UISTATE/i) }.sort
  end

  # UI State that exists on the client.
  def headers_hash
    value = headers.map(&:last).join
    value.present? ? self.class.deserialize(value) : {}
  end

  def cookies
    request.cookies.select { |(key, _)| key.match?(/TURBOREFLEX_UISTATE/i) }.sort
  end

  # UI State the server already knows about.
  def cookies_hash
    value = cookies.map(&:last).join
    value.present? ? self.class.deserialize(value, message_verifier: message_verifier) : {}
  end
end
