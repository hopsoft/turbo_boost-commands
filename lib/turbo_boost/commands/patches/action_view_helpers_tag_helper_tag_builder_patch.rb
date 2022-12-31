# frozen_string_literal: true

require_relative "../attribute_hydration"

module TurboBoost::Commands::Patches::ActionViewHelpersTagHelperTagBuilderPatch
  def tag_options(options, ...)
    dehydrated_options = TurboBoost::Commands::AttributeHydration.dehydrate(options)

    if dehydrated_options.is_a?(Hash)
      dehydrated_options.each do |key, value|
        next unless value.is_a?(Array) || value.is_a?(Hash)
        next if TurboBoost::Commands::AttributeHydration.prefixed_attribute?(key)

        # Rails implicitly converts certain attributes to JSON,
        # so we check keys before performing JSON conversion
        dehydrated_options[key] = value.to_json
      end
    end

    super(dehydrated_options, ...)
  end
end
