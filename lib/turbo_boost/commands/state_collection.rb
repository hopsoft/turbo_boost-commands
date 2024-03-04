# frozen_string_literal: true

require_relative "state"

class TurboBoost::Commands::StateCollection
  include Enumerable

  def initialize(collection = [])
    collection ||= []
    @dictionary = {}
    @collection = collection.map do |entry|
      entry.slice(:name, :signed, :changed).with_indifferent_access
    end
  end

  def [](name)
    return dictionary[name] if dictionary.key?(name)
    entry = collection.find { |entry| entry[:name] == name }
    entry ||= push(name: name)
    dictionary[name] = TurboBoost::Commands::State.from_sgid_param(entry[:signed])
  end

  def push(entry = {})
    entry = entry.with_indifferent_access
    return self if entry.blank?
    return self if entry[:name].blank?
    return self if key?(entry[:name])
    collection.push entry.slice(:name, :signed, :changed)
    self
  end
  alias_method :append, :push
  alias_method :<<, :push

  def include?(name)
    collection.any? { |existing| existing[:name] == name }
  end
  alias_method :member?, :include?
  alias_method :has_key?, :include?
  alias_method :key?, :include?

  delegate :each, to: :dictionary

  private

  attr_reader :collection, :dictionary
end
