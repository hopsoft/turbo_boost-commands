# frozen_string_literal: true

class TurboReflex::ElementAttributes
  def initialize(prefix, attributes: {})
    prefix = prefix.to_s

    attributes.each do |key, value|
      key = key.to_s.strip

      next unless key.start_with?(prefix)

      name = key.parameterize.underscore.delete_prefix("#{prefix}_")
      value = value.to_i if value.to_s.match?(/\A\d+\z/)
      value = value == "true" if value.match?(/\A(true|false)\z/i)
      instance_variable_set "@#{name}", value

      next if respond_to?(name)

      self.class.define_method(name) { instance_variable_get :"@#{name}" }

      if value.is_a?(TrueClass) || value.is_a?(FalseClass)
        self.class.define_method("#{name}?") { public_send(name) }
      end
    end
  end
end
