# frozen_string_literal: true

module TurboReflex::TurboReflexHelper
  include Turbo::FramesHelper

  def turbo_reflex_frame_tag(&block)
    turbo_frame_tag("turbo-reflex-frame", data: {turbo_reflex_src: turbo_reflex_path}, &block)
  end
end
