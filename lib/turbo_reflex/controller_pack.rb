# frozen_string_literal: true

require_relative "runner"

class TurboReflex::ControllerPack
  attr_reader :controller, :runner

  delegate(
    :request,
    :response,
    to: :controller
  )

  delegate(
    :controller_action_prevented?,
    :meta_tag,
    :run,
    :update_response,
    to: :runner
  )

  def initialize(controller)
    @controller = controller
    @runner = TurboReflex::Runner.new(controller)
  end

  def reflex
    runner.reflex_instance
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

  def render(html: "", status: nil)
    should_redirect = if request.method.match?(/GET/i)
      false
    else
      request.accepts.include? Mime::Type.lookup_by_extension(:turbo_stream)
    end

    response.set_header "TurboReflex", "Append"
    status ||= :multiple_choices if should_redirect # HTTP 300
    controller.render html: html, layout: false, status: status || :ok
  end
end
