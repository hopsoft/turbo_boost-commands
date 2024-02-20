# frozen_string_literal: true

class TestsController < ApplicationController
  layout "pico"

  def destroy
    Current.template = "tests/drivers/method._turbo_stream.html.erb"
    render turbo_stream: turbo_stream.replace("drivers-method", partial: "tests/drivers/method")
  end
end
