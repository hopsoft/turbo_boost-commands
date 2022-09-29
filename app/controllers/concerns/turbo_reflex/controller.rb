# frozen_string_literal: true

module TurboReflex::Controller
  extend ActiveSupport::Concern

  included do
    before_action :run_turbo_reflex
    after_action :append_turbo_reflex_to_response
    helper_method :turbo_reflex_meta_tag, :turbo_reflex_performed?, :turbo_reflex_requested?
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

  protected

  def run_turbo_reflex
    turbo_reflex_runner.run
  end

  def append_turbo_reflex_to_response
    turbo_reflex_runner.append_to_response
  end
end
