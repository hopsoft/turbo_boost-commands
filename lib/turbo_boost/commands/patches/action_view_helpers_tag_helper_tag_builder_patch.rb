# frozen_string_literal: true

require_relative "../attribute_hydration"

module TurboBoost::Commands::Patches::ActionViewHelpersTagHelperTagBuilderPatch
  def tag_options(options, ...)
    options = turbo_boost&.state&.tag_options(options) || options
    options = TurboBoost::Commands::AttributeHydration.dehydrate(options)
    super(options, ...)
  end

  private

  def turbo_boost
    return nil unless @view_context.respond_to?(:turbo_boost)
    @view_context.turbo_boost
  end
end
