# frozen_string_literal: true

class DemosController < ApplicationController
  def show
    render "demos/#{params[:id]}/index"
  end
end
