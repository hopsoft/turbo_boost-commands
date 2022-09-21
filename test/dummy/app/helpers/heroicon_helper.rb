# frozen_string_literal: true

module HeroiconHelper
  def heroicon_fill(local_assigns)
    local_assigns[:solid] ? "currentColor" : "none"
  end

  def heroicon_stroke(local_assigns)
    local_assigns[:solid] ? nil : "currentColor"
  end

  def heroicon_view_box(local_assigns)
    "0 0 24 24"
  end
end
