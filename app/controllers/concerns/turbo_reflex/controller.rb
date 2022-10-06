# frozen_string_literal: true

module TurboReflex::Controller
  extend ActiveSupport::Concern

  included do
    before_action :run_turbo_reflex
    after_action :append_turbo_reflex_to_response
    helper_method(
      :turbo_reflex_meta_tag,
      :turbo_reflex_requested?,
      :turbo_reflex_performed?,
      :turbo_reflex_errored?,
      :turbo_reflex_controller_action_prevented?,
      :turbo_reflex_response_body_rewritten?
    )
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

  def turbo_reflex_response_body_rewritten?
    turbo_reflex_runner.response_body_rewritten?
  end

  protected

  def run_turbo_reflex
    turbo_reflex_runner.run
  end

  def append_turbo_reflex_to_response
    return if turbo_relfex_runner.should_rewrite_response_body?
    turbo_reflex_runner.append_to_response
  end
end
