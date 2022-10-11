# frozen_string_literal: true

module TurboReflex::Controller
  extend ActiveSupport::Concern

  included do
    before_action :run_turbo_reflex
    after_action :update_response_with_turbo_reflex
    helper_method(
      :turbo_reflex_meta_tag,
      :turbo_reflex_requested?,
      :turbo_reflex_performed?,
      :turbo_reflex_errored?,
      :turbo_reflex_controller_action_prevented?
    )
  end

  def turbo_reflex
    turbo_reflex_runner.reflex_instance
  end

  def turbo_reflex_runner
    @turbo_reflex_runner ||= TurboReflex::Runner.new(self)
  end

  def turbo_reflex_meta_tag
    turbo_reflex_runner.meta_tag
  end

  def turbo_reflex_requested?
    turbo_reflex_runner.reflex_requested?
  end

  def turbo_reflex_performed?
    turbo_reflex_runner.reflex_performed?
  end

  def turbo_reflex_errored?
    turbo_reflex_runner.reflex_errored?
  end

  def turbo_reflex_controller_action_prevented?
    turbo_reflex_runner.controller_action_prevented?
  end

  def render_turbo_reflex(html = "", status: nil)
    should_redirect = if request.method.match?(/GET/i)
      false
    else
      request.accepts.include? Mime::Type.lookup_by_extension(:turbo_stream)
    end

    response.set_header "TurboReflex", "Append"
    status ||= :multiple_choices if should_redirect # HTTP 300
    render html: html, layout: false, status: status || :ok
  end

  protected

  def run_turbo_reflex
    turbo_reflex_runner.run
  end

  def update_response_with_turbo_reflex
    turbo_reflex_runner.update_response
  end
end
