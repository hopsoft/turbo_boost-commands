# frozen_string_literal: true

require_relative "runner"

class TurboBoost::Commands::ControllerPack
  include TurboBoost::Commands::AttributeHydration

  attr_reader :command, :controller, :runner

  delegate(
    :request,
    :response,
    to: :controller
  )

  delegate(
    :command_requested?,
    :command_performed?,
    :command_errored?,
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

  def render(...)
    command.render_response(...)
  end
end
