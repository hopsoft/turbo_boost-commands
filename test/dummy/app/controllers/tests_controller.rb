# frozen_string_literal: true

class TestsController < ApplicationController
  def show
    render params[:id]
  end
end
