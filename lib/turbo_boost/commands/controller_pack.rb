# frozen_string_literal: true

require_relative "runner"

class TurboBoost::Commands::ControllerPack
  attr_reader :controller, :runner, :command

  delegate(
    :request,
    :response,
    to: :controller
  )

  delegate(
    :controller_action_prevented?,
    :meta_tag,
    :run,
    :state,
    :update_response,
    to: :runner
  )

  delegate_missing_to :command

  def initialize(controller)
    @controller = controller
    @runner = TurboBoost::Commands::Runner.new(controller)
    @command = runner.command_instance
  end

  def requested?
    runner.command_requested?
  end

  def performed?
    runner.command_performed?
  end

  def errored?
    runner.command_errored?
  end

  def render(...)
    command.render_response(...)
  end
end
