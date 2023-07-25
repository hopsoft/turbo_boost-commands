# frozen_string_literal: true

class BasicCommandsController < ApplicationController
  # GET /basic_command
  def show
  end

  # GET /basic_command/demo
  def demo
    @count ||= 0
  end
end
