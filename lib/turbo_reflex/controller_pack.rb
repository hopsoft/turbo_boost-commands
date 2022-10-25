# frozen_string_literal: true

require_relative "runner"

class TurboReflex::ControllerPack
  attr_reader :controller, :runner, :reflex

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

  delegate_missing_to :reflex

  def initialize(controller)
    @controller = controller
    @runner = TurboReflex::Runner.new(controller)
    @reflex = runner.reflex_instance
  end

  def requested?
    runner.reflex_requested?
  end

  def performed?
    runner.reflex_performed?
  end

  def errored?
    runner.reflex_errored?
  end

  def render(...)
    reflex.render_response(...)
  end
end
