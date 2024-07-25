# frozen_string_literal: true

class TurboFrameReplacesController < ApplicationController
  # GET /turbo_frame_replace
  def show
    @extra_data ||= "Unchanged"
  end
end
