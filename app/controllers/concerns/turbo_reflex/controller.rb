# frozen_string_literal: true

module TurboReflex::Controller
  extend ActiveSupport::Concern

  included do
    before_action -> { turbo_reflex.run }
    after_action -> { turbo_reflex.update_response }
    helper_method :turbo_reflex
  end

  def turbo_reflex
    @turbo_reflex ||= TurboReflex::ControllerPack.new(self)
  end
end
