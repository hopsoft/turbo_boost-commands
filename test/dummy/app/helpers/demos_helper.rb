# frozen_string_literal: true

module DemosHelper
  def demo_name
    return nil unless controller_name == "demos"
    params[:id]
  end

  def demo_active?(name)
    demo_name == name.to_s
  end
end
