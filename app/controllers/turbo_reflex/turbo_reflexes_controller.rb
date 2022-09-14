# frozen_string_literal: true

class TurboReflex::TurboReflexesController < TurboReflex::ApplicationController
  def show
    return head(:ok) unless turbo_reflex_instance&.turbo_streams.present?
    render html: view_context.turbo_reflex_frame_tag do
      turbo_reflex_instance.turbo_streams.map(&:to_s).join
    end
  end
end
