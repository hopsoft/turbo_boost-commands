# frozen_string_literal: true

require_relative "../attribute_hydration"

module TurboBoost::Commands::Patches::ActionViewHelpersTagHelperTagBuilderPatch
  include TurboBoost::Commands::AttributeHydration

  def tag_options(options, ...)
    dehydrate_option!(options, key: :data) if options.present?
    super(options, ...)
  end

  private

  def dehydrate_option!(options, key:)
    dehydrate_option(options, key: key.to_sym) || dehydrate_option(options, key: key.to_s)
  end

  def dehydrate_option(options, key:)
    return false unless options.key?(key)
    options[key] = dehydrate(options[key])
    true
  end
end
