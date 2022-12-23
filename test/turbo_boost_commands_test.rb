# frozen_string_literal: true

require "test_helper"

class TurboBoostCommandsTest < ActiveSupport::TestCase
  test "it has a version number" do
    assert TurboBoost::Commands::VERSION
  end
end
