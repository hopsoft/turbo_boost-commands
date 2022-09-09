# frozen_string_literal: true

class ReflexTestsController < ApplicationController
  def show
    if turbo_reflex_requested?
      render turbo_stream: turbo_stream.replace(
        turbo_reflex_params[:frame],
        partial: "reflex_tests/#{turbo_reflex_params[:frame]}"
      )
    end
  end
end
