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

      next if orig_respond_to?(name)

      self.class.define_method(name) { instance_variable_get :"@#{name}" }
      self.class.define_method("#{name}?") { public_send(name).present? }
    end
  end

  alias_method :orig_respond_to?, :respond_to?

  def method_missing(name, *args)
    return false if name.to_s.end_with?("?")
    nil
  end

  def respond_to?(name, include_all = false)
    true
  end
end
