# frozen_string_literal: true

require_relative "../attribute_hydration"

module TurboBoost::Commands::Patches::ActionViewHelpersTagHelperTagBuilderPatch
  def tag_options(options, ...)
    dehydrated_options = TurboBoost::Commands::AttributeHydration.dehydrate(options)
    super(dehydrated_options, ...)
  end
end
