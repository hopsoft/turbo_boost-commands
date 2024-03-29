# frozen_string_literal: true

require_relative "runner"

class TurboBoost::Commands::ControllerPack
  include TurboBoost::Commands::AttributeHydration

  attr_reader :runner, :command

  delegate(
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

  def initialize(controller)
    @runner = TurboBoost::Commands::Runner.new(controller)
    @command = runner.command_instance
  end

  def state
    ActiveSupport::Deprecation.warn "The `state` method has been deprecated. Please update to `command_state`."
    command_state
  end
end
