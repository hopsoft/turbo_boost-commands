# frozen_string_literal: true

require_relative "../state/manager"
require_relative "runner"

class TurboBoost::Commands::ControllerPack
  include TurboBoost::Commands::AttributeHydration

  attr_reader :controller, :state_manager, :runner, :command
  alias_method :state, :state_manager

  delegate(
    :request,
    :response,
    to: :controller
  )

  delegate(
    :command_aborted?,
    :command_errored?,
    :command_performed?,
    :command_requested?,
    :command_succeeded?,
    :meta_tag,
    to: :runner
  )

  delegate_missing_to :command

  def initialize(controller)
    @controller = controller
    @state_manager = TurboBoost::State::Manager.new(controller)
    @runner = TurboBoost::Commands::Runner.new(controller)
    @command = runner.command_instance
  end

  def render(...)
    command.render_response(...)
  end
end
