# frozen_string_literal: true

module DemosHelper
  def demo_index
    @demo_index ||= 0
  end

  def demo_name
    return nil unless controller_name == "demos"
    params[:id]
  end

  def demo_active?(name)
    demo_name == name.to_s
  end

  def demos_active?
    controller_name == "demos" && action_name == "index"
  end

  def demo_frame_id(template_path)
    "frame-" + Base64.urlsafe_encode64(template_path)
  end

  def demo_turbo_frame_tag(template_path)
    turbo_frame_tag demo_frame_id(template_path), src: frame_path(Base64.urlsafe_encode64(template_path)), loading: "lazy"
  end
end
