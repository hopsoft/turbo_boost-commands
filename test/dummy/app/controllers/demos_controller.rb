# frozen_string_literal: true

class DemosController < ApplicationController
  def show
    render params[:id]
  end

  def update
    render params[:id] # unless performed?
  end
end
