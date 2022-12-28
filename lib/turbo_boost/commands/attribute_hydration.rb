# frozen_string_literal: true

module TurboBoost::Commands::AttributeHydration
  def hydrate(value, json: false)
    value = JSON.parse(value).with_indifferent_access if json
    hydrated = case value
    when Array
      value.map { |val| hydrate(val) }
    when Hash
      value.each_with_object({}.with_indifferent_access) do |(key, val), memo|
        memo[key] = hydrate(val)
      end
    else
      begin
        GlobalID::Locator.locate_signed(value)
      rescue
        value
      end
    end
  rescue => error
    Rails.logger.error "Failed to hydrate value! #{value}; #{error}"
  ensure
    hydrated.blank? ? nil : hydrated
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
        value&.to_s
      end
    end
  rescue => error
    Rails.logger.error "Failed to dehydrate value! #{value}; #{error}"
    value
  end
end
