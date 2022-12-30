# frozen_string_literal: true

require_relative "../attribute_hydration"

module TurboBoost::Commands::Patches::ActionViewHelpersTagHelperTagBuilderPatch
  # TODO: revisit tag_option to see it might work for all scenarios
  # ATTRIBUTE_PATTERN = /assigns|locals/i

  # def tag_option(key, value, ...)
  #  value = dehydrate(value) if key.match?(ATTRIBUTE_PATTERN)
  #  super(key, value, ...)
  # end

  def tag_options(options, ...)
    dehydrate_options!(options, key: :data)
    super(options, ...)
  end

  private

  def dehydrate_options!(options, key:)
    return unless options.is_a?(Hash)

    data_key = :data if options.key?(:data)
    data_key ||= "data" if options.key?("data")
    return unless data_key

    data = options[data_key]
    return unless data.is_a?(Hash)

    command_key = :turbo_command if data.key?(:turbo_command)
    command_key = "turbo_command" if data.key?("turbo_command")
    return unless command_key

    options.transform_keys!(&:to_sym)
    options[:rel] = "nofollow"
    options.each { |key, value| options[key] = TurboBoost::Commands::AttributeHydration.dehydrate(value) }
  end
end
