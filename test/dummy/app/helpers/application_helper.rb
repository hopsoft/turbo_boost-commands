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
end
