# frozen_string_literal: true

class DocsController < ApplicationController
  def show
    render params[:id]
  end
end
