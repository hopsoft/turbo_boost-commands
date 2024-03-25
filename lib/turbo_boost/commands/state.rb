# frozen_string_literal: true

class TurboBoost::Commands::State
  def initialize(payload = {})
    payload = payload.to_h
    @store ||= (payload[:unsigned] || {}).with_indifferent_access

    store[:_now] ||= {}
    store[:_page] = payload[:page] || {}
    store[:_signed] = if payload[:signed].present?
      URI::UID.from_sgid(payload[:signed], for: self.class.name)&.decode
    end
    store[:_signed] ||= {}
  end

  delegate_missing_to :store

  def now
    store[:_now]
  end

  def page
    store[:_page]
  end

  def signed
    store[:_signed]
  end

  def cache_key
    "TurboBoost::Commands::State/#{Digest::SHA2.base64digest(to_s)}"
  end

  def to_json
    uid = URI::UID.build(signed, include_blank: false)
    sgid = uid.to_sgid_param(for: self.class.name, expires_in: 2.day)
    {signed: sgid, unsigned: signed}.to_json(camelize: false)
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

  private

  attr_reader :store
end
