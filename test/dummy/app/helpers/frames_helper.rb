# frozen_string_literal: true

module FramesHelper
  def run_demo?
    params[:behavior] == "demo"
  end
end
