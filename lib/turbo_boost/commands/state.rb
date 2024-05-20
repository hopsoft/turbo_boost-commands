# frozen_string_literal: true

require "digest/md5"
require_relative "state_store"

class TurboBoost::Commands::State
  include Enumerable

  def initialize(payload = {})
    payload = payload.respond_to?(:to_unsafe_h) ? payload.to_unsafe_h : payload.to_h
    payload = payload.with_indifferent_access

    @store = HashWithIndifferentAccess.new
    @store[:_now] = {}.with_indifferent_access
    @store[:_page] = payload.fetch(:page, {}).with_indifferent_access
    @store[:_unsigned] = payload.fetch(:unsigned, {}).with_indifferent_access
    @store[:_signed] = TurboBoost::Commands::StateStore.new(payload.fetch(:signed, {}))
  end

  delegate_missing_to :signed
  delegate :each, to: :all

  def page
    @store[:_page]
  end

  def now
    @store[:_now]
  end

  def signed
    @store[:_signed]
  end

  def all
    signed.to_h.merge now
  end

  def cache_key
    "TurboBoost::Commands::State/#{Digest::MD5.base64digest(all.to_s)}"
  end

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
