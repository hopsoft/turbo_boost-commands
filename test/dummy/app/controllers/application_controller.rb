# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def state
    turbo_reflex.state
  end
  helper_method :state
end
