# frozen_string_literal: true

require "test_helper"

class TurboBoost::Commands::CommandValidatorTest < ActiveSupport::TestCase
  class ValidTestCommand < TurboBoost::Commands::Command
    def perform
    end
  end

  class InvalidTestCommand
    def perform
    end
  end

  test "validate! valid class and valid method" do
    assert TurboBoost::Commands::CommandValidator.new(ValidTestCommand, :perform).validate!
  end

  test "validate! valid class and invalid method" do
    assert_raises TurboBoost::Commands::InvalidMethodError do
      TurboBoost::Commands::CommandValidator.new(ValidTestCommand, :hash).validate!
    end
  end

  test "validate valid class and valid method" do
    assert TurboBoost::Commands::CommandValidator.new(ValidTestCommand, :perform).validate
  end

  test "validate valid class and invalid method" do
    refute TurboBoost::Commands::CommandValidator.new(ValidTestCommand, :hash).validate
  end

  test "valid? valid class and valid method" do
    assert TurboBoost::Commands::CommandValidator.new(ValidTestCommand, :perform).validate
  end

  test "valid? valid class and invalid method" do
    refute TurboBoost::Commands::CommandValidator.new(ValidTestCommand, :hash).validate
  end

  test "validate! invalid class" do
    assert_raises TurboBoost::Commands::InvalidClassError do
      TurboBoost::Commands::CommandValidator.new(InvalidTestCommand, :perform).validate!
    end
  end

  test "validate invalid class" do
    refute TurboBoost::Commands::CommandValidator.new(InvalidTestCommand, :perform).validate
  end

  test "valid? invalid class" do
    refute TurboBoost::Commands::CommandValidator.new(InvalidTestCommand, :perform).valid?
  end
end
