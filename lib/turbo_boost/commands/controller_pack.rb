# frozen_string_literal: true

require_relative "../state"
require_relative "runner"

class TurboBoost::Commands::ControllerPack
  include TurboBoost::Commands::AttributeHydration

  attr_reader :runner, :command

  delegate(
    :command_aborted?,
    :command_errored?,
    :command_performed?,
    :command_performing?,
    :command_requested?,
    :command_succeeded?,
    :controller,
    :meta_tag,
    :state,
    to: :runner
  )

  def initialize(controller)
    @runner = TurboBoost::Commands::Runner.new(controller)
    @command = runner.command_instance
  end
end
