# frozen_string_literal: true

class TestWithActionCommand < ApplicationCommand
  def perform
    target = state.dig(element.data.target, :attributes) || {}
    target["data-tooltip"] = "TestWithAction invoked at: #{Time.now.iso8601}"
    state.merge! element.data.target => {attributes: target}
  end
end
