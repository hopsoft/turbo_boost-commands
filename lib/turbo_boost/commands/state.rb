# frozen_string_literal: true

require "digest/md5"
require_relative "state_store"

# Class that encapsulates all the various forms of state.
#
# 1. `page` - Client-side transient page state used for rendering remembered element attributes
# 2. `now` - Server-side state for the current render only (discarded after rendering)
# 3. `signed` - Server-side state that persists across renders (state that was used for the last server-side render)
# 4. `unsigned` - Client-side state (optimistic client-side changes)
# 5. `current` - Combined server-side state (signed + now)
# 6. `all` - All state except unsigned (signed + now + page)
#
class TurboBoost::Commands::State
  include Enumerable

  def initialize(payload = {})
    payload = payload.respond_to?(:to_unsafe_h) ? payload.to_unsafe_h : payload.to_h
    payload = payload.with_indifferent_access

    @now = {}.with_indifferent_access
    @page = payload.fetch(:page, {}).with_indifferent_access
    @signed = TurboBoost::Commands::StateStore.new(payload.fetch(:signed, {}))
    @unsigned = payload.fetch(:unsigned, {}).with_indifferent_access
  end

  # Client-side transient page state used for rendering remembered element attributes
  # @return [HashWithIndifferentAccess]
  attr_reader :page

  # Server-side state for the current render only (similar to flash.now)
  # @note Discarded after rendering
  # @return [HashWithIndifferentAccess]
  attr_reader :now

  # Server-side state that persists across renders
  # This is the state that was used for the last server-side render (untampered by the client)
  # @return [TurboBoost::Commands::StateStore]
  attr_reader :signed

  # @note Most state will interactions work with the signed state, so we delegate missing methods to it.
  delegate_missing_to :signed

  # Client-side state (optimistic client-side changes)
  # @note There is a hook on Command instances to resolve state `Command#resolve_state`,
  #       where Command authors can determine how to properly handle optimistic client-side state.
  # @return [HashWithIndifferentAccess]
  attr_reader :unsigned
  alias_method :optimistic, :unsigned

  # Combined server-side state (signed + now)
  # @return [HashWithIndifferentAccess]
  def current
    signed.to_h.merge now
  end

  delegate :each, to: :current

  # All state except unsigned (page + current).
  # @return [HashWithIndifferentAccess]
  def all
    page.merge current
  end

  # Returns a cache key representing "all" state
  def cache_key
    "TurboBoost::Commands::State/#{Digest::MD5.base64digest(all.to_s)}"
  end

  # A JSON representation of state that can be sent to the client
  #
  # Includes the following keys:
  # * `signed` - The signed state (String)
  # * `unsigned` - The unsigned state (Hash)
  #
  # @return [String]
  def to_json
    {signed: signed.to_sgid_param, unsigned: signed.to_h}.to_json(camelize: false)
  end

  def tag_options(options = {})
    return options unless options.is_a?(Hash)

    options = options.deep_symbolize_keys
    return options unless options.key?(:turbo_boost)

    config = options.delete(:turbo_boost)
    return options unless config.is_a?(Hash)

    attributes = config[:remember]
    return options if attributes.blank?

    attributes = begin
      attributes.is_a?(Array) ? attributes : JSON.parse(attributes.to_s)
    rescue
      raise TurboBoost::Commands::StateError,
        "Invalid `turbo_boost` options! `attributes` must be an Array of attributes to remember!"
    end
    attributes ||= []
    attributes.map!(&:to_s).uniq!
    return options if attributes.blank?

    if options[:id].blank?
      raise TurboBoost::Commands::StateError, "An `id` attribute is required for remembering state!"
    end

    options[:aria] ||= {}
    options[:data] ||= {}
    options[:data][:turbo_boost_state_attributes] = attributes.to_json

    attributes.each do |name|
      value = page.dig(options[:id], name)
      case name
      in String if name.start_with?("aria-") then options[:aria][name.delete_prefix("aria-").to_sym] = value
      in String if name.start_with?("data-") then options[:data][name.delete_prefix("data-").to_sym] = value
      else options[name.to_sym] = value
      end
    end

    options
  end
end
