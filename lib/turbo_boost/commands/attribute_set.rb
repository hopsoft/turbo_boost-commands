# frozen_string_literal: true

require_relative "attribute_hydration"

class TurboBoost::Commands::AttributeSet
  include TurboBoost::Commands::AttributeHydration

  # These methods enable Ruby pattern matching
  delegate :deconstruct, :deconstruct_keys, to: :to_h

  def initialize(attributes = {}, prefix: nil)
    prefix = prefix.to_s
    attrs = attributes.to_h.transform_values do |value|
      value.is_a?(self.class) ? value : value.to_s
    end

    attrs.each do |key, value|
      key = key.to_s.strip

      next unless prefix.blank? || key.start_with?(prefix)

      name = key.parameterize.underscore
      name.delete_prefix!("#{prefix}_") unless prefix.blank?

      # type casting
      value = value.to_i if value.to_s.match?(/\A\d+\z/)
      value = value == "true" if value.is_a?(String) && value.match?(/\A(true|false)\z/i)
      value = hydrate(value, json: true) if name.match?(/\Aassigns|locals\z/)

      instance_variable_set "@#{name}", value

      next if orig_respond_to_missing?(name, false)

      self.class.define_method(name) { instance_variable_get :"@#{name}" }
      self.class.define_method("#{name}?") { public_send(name).present? }
    end
  end

  def to_h
    instance_variables.each_with_object({}.with_indifferent_access) do |name, memo|
      value = instance_variable_get(name)
      value = value.to_h if value.is_a?(self.class)
      memo[name.to_s.delete_prefix("@").to_sym] = value
    end
  end

  def render_options
    options = {
      partial: renders,
      assigns: assigns,
      locals: locals
    }
    options.deep_symbolize_keys
  end

  def respond_to?(name, include_all = false)
    respond_to_missing? name, include_all
  end

  alias_method :orig_respond_to_missing?, :respond_to_missing?

  def respond_to_missing?(name, include_all)
    true
  end

  def method_missing(name, *args)
    return false if name.end_with?("?")
    nil
  end
end
