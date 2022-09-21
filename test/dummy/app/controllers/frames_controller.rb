# frozen_string_literal: true

class FramesController < ApplicationController
  layout false

  before_action :assign_template_path

  def show
    render @template_path
  end

  def update
    render @template_path
  end

  private

  def assign_template_path
    @template_path = Base64.urlsafe_decode64(params[:id])
  end
end
