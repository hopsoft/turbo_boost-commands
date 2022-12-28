# frozen_string_literal: true

module TurboBoost::Commands::Hydrator
  class << self
    def hydrate(value)
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

      hydrated.blank? ? nil : hydrated
    end

    def dehydrate(value)
      case value
      when Array
        value.map { |val| dehydrate_value(val) }
      when Hash
        value.each_with_object({}.with_indifferent_access) do |(key, val), memo|
          memo[key] = dehydrate(val)
        end
      else
        if value.respond_to?(:to_sgid_param)
          value.try(:persisted?) ? value.to_sgid_param : nil
        else
          value.to_s
        end
      end
    end
  end
end
