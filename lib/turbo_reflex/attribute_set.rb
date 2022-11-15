# frozen_string_literal: true

class TurboReflex::AttributeSet
  def initialize(prefix, attributes: {})
    prefix = prefix.to_s
    attrs = attributes.to_h.transform_values(&:to_s)

    attrs.each do |key, value|
      key = key.to_s.strip

      next unless key.start_with?(prefix)

      name = key.parameterize.underscore.delete_prefix("#{prefix}_")
      value = value.to_i if value.to_s.match?(/\A\d+\z/)
      value = value == "true" if value.is_a?(String) && value.match?(/\A(true|false)\z/i)
      instance_variable_set "@#{name}", value

      next if orig_respond_to_missing?(name, false)

      self.class.define_method(name) { instance_variable_get :"@#{name}" }
      self.class.define_method("#{name}?") { public_send(name).present? }
    end
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
