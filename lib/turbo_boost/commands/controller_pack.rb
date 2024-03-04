# frozen_string_literal: true

require_relative "runner"

class TurboBoost::Commands::ControllerPack
  include TurboBoost::Commands::AttributeHydration

  def initialize(controller)
    @runner = TurboBoost::Commands::Runner.new(controller)
    @command = runner.command_instance
  end

  attr_reader :runner, :command

  delegate(
    :command_state_collection,
    :command_state,
    :command_aborted?,
    :command_errored?,
    :command_performed?,
    :command_performing?,
    :command_requested?,
    :command_succeeded?,
    :controller,
    to: :runner
  )

  delegate :[], to: :command_state_collection

  # DEPRECATED: Use `command_state` instead
  def state
    ActiveSupport::Deprecation.warn "The `state` method has been deprecated. Please update to `command_state`."
    command_state
  end
end
