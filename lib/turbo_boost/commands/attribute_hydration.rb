# frozen_string_literal: true

module TurboBoost::Commands::AttributeHydration
  extend self

  def hydrate(value)
    case value
    when Array
      value.map { |val| hydrate(val) }
    when Hash
      value.each_with_object(HashWithIndifferentAccess.new) do |(key, val), memo|
        memo[key] = hydrate(val)
      end
    when String
      parsed_value = parse_json(value)
      hydrated_value = hydrate(parsed_value) unless parsed_value.nil?
      hydrated_value ||= GlobalID::Locator.locate_signed(value) if possible_sgid_string?(value)
      hydrated_value || value
    else
      value
    end
  rescue => error
    Rails.logger.error "Failed to hydrate value! #{value}; #{error}"
    value
  end

  def dehydrate(value)
    return value unless has_sgid?(value)
    case value
    when Array
      value.map { |val| dehydrate val }
    when Hash
      value.each_with_object(HashWithIndifferentAccess.new) do |(key, val), memo|
        val = dehydrate(val)
        memo[key] = convert_to_json?(key, val) ? val.to_json : val
      end
    else
      implements_sgid?(value) ? value.to_sgid_param : value
    end
  end

  private

  # simple regular expressions checked before attempting specific hydration strategies
  PREFIX_ATTRIBUTE_REGEXP = /\Aaria|data\z/i
  JSON_REGEX = /.*(\[|\{).*(\}|\]).*/
  SGID_PARAM_REGEX = /.{100,}/i

  # Rails implicitly converts certain keys to JSON,
  # so we check keys before performing JSON conversion
  def prefixed_attribute?(name)
    PREFIX_ATTRIBUTE_REGEXP.match? name.to_s
  end

  def convert_to_json?(key, value)
    return false if prefixed_attribute?(key)
    case value
    when Array, Hash then true
    else false
    end
  end

  def possible_json_string?(value)
    return false unless value.is_a?(String)
    JSON_REGEX.match? value
  end

  def possible_sgid_string?(value)
    return false unless value.is_a?(String)
    SGID_PARAM_REGEX.match? value
  end

  def implements_sgid?(value)
    value.respond_to?(:to_sgid_param) && value.try(:persisted?)
  end

  def find_sgid_value(value)
    case value
    when Array then value.find { |val| find_sgid_value val }
    when Hash then find_sgid_value(value.values)
    else implements_sgid?(value) ? value : nil
    end
  end

  def has_sgid?(value)
    find_sgid_value(value).present?
  end

  def parse_json(value)
    return nil unless possible_json_string?(value)
    JSON.parse value
  rescue
    nil
  end
end
