# frozen_string_literal: true

class RememberAttributesCommand < ApplicationCommand
  prevent_controller_action

  def perform
    element.data.attributes.each do |name|
      value = element[name]
      value = name if value.blank? && element.include?(name)
      remember name, value
    end
  end

  private

  def remember(name, value)
    return unless element.id
    data = state[element.id] ||= {}
    data[name] = value
    state[element.id] = data
  end
end
