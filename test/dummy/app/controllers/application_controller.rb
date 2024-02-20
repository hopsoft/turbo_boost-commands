# frozen_string_literal: true

class ApplicationController < ActionController::Base
  prepend_before_action :init_current
  after_action :cleanup

  # An example of how to override state with data stored on the server
  # Simply return a Hash of state data
  # Could be fetched from Redis, Postgres, etc...
  #
  # IMPORTANT: Server state should be scoped to the visitor
  #
  # Rembember to persist this state during/after the controller and action have performed
  # turbo_boost_state do # Example
  #   # {example: SecureRandom.hex}

  #   # Too much data
  #   # 1000.times.each_with_object({}) do |index, memo|
  #   #   memo[SecureRandom.hex] = index
  #   # end
  # end

  private

  def init_current
    session[:forced_load] = true unless session.loaded? # forces session to load (required for automated testing)
    Current.user ||= User.find_or_create_by(session_id: session.id.to_s)

    # Determine which view template will be rendered
    Current.template = lookup_context.find_template(
      action_name, # ..................................... the base name of the template to find
      self.class._prefixes, # ............................ directories to search for the template
      false, # ........................................... partial (we are looking for the template not a partial)
      [], # .............................................. keys (locals that would be passed to the template)
      formats: request.accepts.map(&:symbol).compact # ... the template formats accepted by the client
    )&.short_identifier
  rescue => error
    Rails.logger.error "Error in ApplicationController#init_current! #{error.message}"
  end

  def cleanup
    return unless rand(10) == 0
    User.where(updated_at: ..1.day.ago).delete_all
  end
end
