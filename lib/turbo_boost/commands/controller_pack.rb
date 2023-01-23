# frozen_string_literal: true

require_relative "../state/manager"
require_relative "runner"

class TurboBoost::Commands::ControllerPack
  include TurboBoost::Commands::AttributeHydration

  attr_reader :controller, :state_manager, :runner, :command
  alias_method :state, :state_manager

  delegate(
    :command_aborted?,
    :command_errored?,
    :command_performing?,
    :command_performed?,
    :command_requested?,
    :command_succeeded?,
    :meta_tag,
    to: :runner
  )

  def initialize(controller)
    @controller = controller
    @state_manager = TurboBoost::State::Manager.new(controller)
    @runner = TurboBoost::Commands::Runner.new(controller, state_manager)
    @command = runner.command_instance
  end
end
