# frozen_string_literal: true

module ApplicationHelper
  DOCS_CONTROLLERS = HashWithIndifferentAccess.new(
    installations: true
  ).freeze

  DEMOS_CONTROLLERS = HashWithIndifferentAccess.new.freeze

  def docs_controller?
    DOCS_CONTROLLERS[controller_name]
  end

  def demos_controller?
    DEMOS_CONTROLLERS[controller_name]
  end

  # def heroicon(name)
  #  "heroicons/#{name}"
  # end

  # def component(name)
  # "components/#{name}"
  # end

  # def flowbite(name)
  # component "flowbite/#{name}"
  # end

  # def icon(name)
  # component "icons/#{name}"
  # end

  # def el_id(*values, prefix: nil)
  # "#{prefix}#{values.join("-").parameterize}"
  # end

  # def boolean_text(value)
  # (!!value).to_s
  # end
end
