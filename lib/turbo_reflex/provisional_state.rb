# frozen_string_literal: true

require_relative "state"

class TurboReflex::ProvisionalState
  def initialize(state_manager)
    @state_manager = state_manager
    @keys = Set.new
  end

  attr_reader :keys

  def [](*keys, default: nil)
    state_manager[*keys, default: default]
  end

  def []=(*keys, value)
    key = TurboReflex::State.key_for(*keys)
    value.nil? ? self.keys.delete(key) : self.keys.add(key)
    state_manager[key] = value
  end

  def clear
    keys.each { |key| state_manager[key] = nil }
    keys.clear
  end

  private

  attr_reader :state_manager
end
