# frozen_string_literal: true

module ApplicationHelper
  def heroicon(name)
    "heroicons/#{name}"
  end

  def component(name)
    "components/#{name}"
  end

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
