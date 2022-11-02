# frozen_string_literal: true

class ApplicationController < ActionController::Base
  prepend_before_action -> { Current.state = turbo_reflex.state }

  # An example of how to override state with data stored on the server
  # Simply return a Hash of state data
  # Could be fetched from Redis, Postgres, etc...
  #
  # IMPORTANT: Server state should be scoped to the visitor
  #
  # Rembember to persist this state during/after the controller and action have performed
  # turbo_reflex_state do
  #   # Example
  #   # {example: SecureRandom.hex}

  #   # Too much data
  #   # 1000.times.each_with_object({}) do |index, memo|
  #   #   memo[SecureRandom.hex] = index
  #   # end
  # end
end
