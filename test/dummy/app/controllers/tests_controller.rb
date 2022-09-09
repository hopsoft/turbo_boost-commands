# frozen_string_literal: true

class TestsController < ApplicationController
  def show
    render params[:id]
  end

  def update
    render html: turbo_stream.invoke("console.log", args: ["You submitted a form!"])
  end
end
