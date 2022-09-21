# frozen_string_literal: true

class FramesController < ApplicationController
  layout false

  def show
    @template_path = Base64.urlsafe_decode64(params[:id])
    render @template_path
  end
end
