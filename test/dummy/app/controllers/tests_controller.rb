# frozen_string_literal: true

class TestsController < ApplicationController
  layout "pico"

  def create
    Current.template = "tests/drivers/_form.turbo_stream.erb"
    render turbo_stream: turbo_stream.replace("form-driver-test", partial: "tests/drivers/form")
  end

  def destroy
    Current.template = "tests/drivers/_method.turbo_stream.erb"
    render turbo_stream: turbo_stream.replace("method-driver-test", partial: "tests/drivers/method")
  end
end
