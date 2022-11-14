# frozen_string_literal: true

class ArticlesController < ApplicationController
  def show
    render params[:id]
  end
end
