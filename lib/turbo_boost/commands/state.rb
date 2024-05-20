# frozen_string_literal: true

require_relative "state_store"

class TurboBoost::Commands::State
  def initialize(payload = {})
    payload = payload.to_h.with_indifferent_access

    @store = HashWithIndifferentAccess.new
    @store[:_now] = {}.with_indifferent_access
    @store[:_page] = payload.fetch(:page, {}).with_indifferent_access
    @store[:_unsigned] = payload.fetch(:unsigned, {}).with_indifferent_access
    @store[:_signed] = TurboBoost::Commands::StateStore.new(payload.fetch(:signed, {}))
  end

  def current
    signed.to_h.merge now
  end

  delegate_missing_to :current

  def now
    @store[:_now]
  end

  def page
    @store[:_page]
  end

  def signed
    @store[:_signed]
  end

  def cache_key
    "TurboBoost::Commands::State/#{Digest::SHA2.base64digest(current.to_s)}"
  end

  def to_json
    {signed: signed.to_sgid_param, unsigned: signed.to_h}.to_json(camelize: false)
  end

  def tag_options(options)
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
      raise TurboBoost::Commands::StateError, "Invalid `turbo_boost` options! `attributes` must be an Array of attributes to remember!"
    end
    attributes ||= []
    attributes.uniq!
    return options if attributes.blank?

    raise TurboBoost::Commands::StateError, "An `id` attribute is required for remembering state!" if options[:id].blank?

    options[:aria] ||= {}
    options[:data] ||= {}
    options[:data][:turbo_boost_state_attributes] = attributes.to_json

    attributes.each do |name|
      if name.start_with?("aria")
        options[:aria][name.to_sym] = page.dig(options[:id], name.to_s.delete_prefix("aria-"))
      elsif name.start_with?("data")
        options[:data][name.to_sym] = page.dig(options[:id], name.to_s.delete_prefix("data-"))
      else
        options[name.to_sym] = page.dig(options[:id], name)
      end
    end

    options
  end
end
