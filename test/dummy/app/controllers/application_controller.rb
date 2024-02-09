# frozen_string_literal: true

class ApplicationController < ActionController::Base
  prepend_before_action :init_current
  after_action :cleanup

  private

  def init_current
    session[:forced_load] = true unless session.loaded? # forces session to load (required for automated testing)
    Current.user ||= User.find_or_create_by(session_id: session.id.to_s)
  end

  def cleanup
    return unless rand(10) == 0
    User.where(updated_at: ..1.day.ago).delete_all
  end
end
