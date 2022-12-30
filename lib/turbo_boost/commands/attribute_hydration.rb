# frozen_string_literal: true

module TurboBoost::Commands::AttributeHydration
  extend self

  # simple regular expressions checked before attempting specific hydration strategies
  JSON_REGEX = /.*(\[|\{).*(\}|\]).*/
  SGID_PARAM_REGEX = /.{100,}/i

  def hydrate(value, json: false)
    value = JSON.parse(value).with_indifferent_access if json
    case value
    when Array
      value.map { |val| hydrate(val) }
    when Hash
      value.each_with_object({}.with_indifferent_access) do |(key, val), memo|
        memo[key] = hydrate(val)
      end
    when String
      hydrated_value = hydrate(value, json: true) if value.match?(JSON_REGEX)
      hydrated_value ||= GlobalID::Locator.locate_signed(value) if value.match?(SGID_PARAM_REGEX)
      hydrated_value || value
    else
      value
    end
  rescue => error
    Rails.logger.error "Failed to hydrate value! #{value}; #{error}"
    value
  end

  def dehydrate(value, json: false)
    case value
    when Array
      dehydrated = value.map { |val| dehydrate_value(val, json: true) }
      json ? dehydrated.to_json : dehydrated
    when Hash
      dehydrated = value.each_with_object({}.with_indifferent_access) do |(key, val), memo|
        memo[key] = dehydrate(val, json: true)
      end
      json ? dehydrated.to_json : dehydrated
    else
      if value.respond_to?(:to_sgid_param)
        value.try(:persisted?) ? value.to_sgid_param : nil
      else
        value
      end
    end
  rescue => error
    Rails.logger.error "Failed to dehydrate value! #{value}; #{error}"
    value
  end
end
