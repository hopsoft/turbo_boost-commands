# frozen_string_literal: true

require_relative "runner"

class TurboBoost::Commands::ControllerPack
  include TurboBoost::Commands::AttributeHydration

  attr_reader :controller, :runner, :command

  delegate(
    :command_aborted?,
    :command_errored?,
    :command_performing?,
    :command_performed?,
    :command_requested?,
    :command_succeeded?,
    to: :runner
  )

  def initialize(controller)
    @controller = controller
    @runner = TurboBoost::Commands::Runner.new(controller)
    @command = runner.command_instance
  end
end
