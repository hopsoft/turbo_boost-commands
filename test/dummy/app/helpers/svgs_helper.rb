# frozen_string_literal: true

module SvgsHelper
  def svg_fill(local_assigns)
    local_assigns[:solid] ? "currentColor" : "none"
  end

  def svg_stroke(local_assigns)
    local_assigns[:solid] ? nil : "currentColor"
  end

  def svg_view_box(local_assigns)
    "0 0 24 24"
  end
end
