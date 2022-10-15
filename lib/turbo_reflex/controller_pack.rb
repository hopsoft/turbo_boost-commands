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
    :update_response,
    to: :runner
  )

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

  def render(html: "", status: nil)
    yield reflex if block_given?
    should_redirect = if request.method.match?(/GET/i)
      false
    else
      request.accepts.include? Mime::Type.lookup_by_extension(:turbo_stream)
    end

    response.set_header "TurboReflex", "Append"
    status ||= :multiple_choices if should_redirect # HTTP 300
    controller.render html: html, layout: false, status: status || :ok
  end

  def method_missing(name, *args, &block)
    return super unless reflex.respond_to?(name)
    reflex.public_send(name, *args, &block)
  end

  def respond_to?(name, include_all = false)
    reflex.respond_to? name, include_all
  end
end
