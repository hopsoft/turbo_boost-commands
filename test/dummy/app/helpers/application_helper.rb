# frozen_string_literal: true

module ApplicationHelper
  def component(name)
    "components/#{name}"
  end

  def flowbite(name)
    component "flowbite/#{name}"
  end

  def heroicon(name)
    component "heroicons/#{name}"
  end

  def icon(name)
    component "icons/#{name}"
  end

  def el_id(*values, prefix: nil)
    "#{prefix}#{values.join("-").parameterize}"
  end

  def boolean_text(value)
    (!!value).to_s
  end
end
