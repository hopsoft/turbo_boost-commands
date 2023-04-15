# frozen_string_literal: true

require_relative "../attribute_hydration"

module TurboBoost::Commands::Patches::ActionViewHelpersTagHelperTagBuilderPatch
  def tag_options(options, *args, **kwargs, &block)
    dehydrated_options = TurboBoost::Commands::AttributeHydration.dehydrate(options)
    super(dehydrated_options, *args, **kwargs, &block)
  end
end
