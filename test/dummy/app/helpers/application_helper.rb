# frozen_string_literal: true

module ApplicationHelper
  DOCS_CONTROLLERS = HashWithIndifferentAccess.new(
    installations: true
  ).freeze

  DEMOS_CONTROLLERS = HashWithIndifferentAccess.new(
    basic_commands: true
  ).freeze

  def controller_action
    "#{controller_name}##{action_name}"
  end

  def controller_action?(name)
    controller_action == name.to_s
  end

  def docs_controller?
    DOCS_CONTROLLERS[controller_name] || controller_name == "todos" && params[:doc]
  end

  def docs_action?(name)
    docs_controller? && action_name == name.to_s
  end

  def demos_controller?
    DEMOS_CONTROLLERS[controller_name] || controller_name == "todos" && params[:demo]
  end
end
