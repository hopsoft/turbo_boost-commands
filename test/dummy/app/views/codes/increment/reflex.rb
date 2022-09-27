# frozen_string_literal: true

class IncrementReflex < TurboReflex::Base
  delegate :session, to: :controller

  # triggered client-side
  # performed server-side by a controller before_action
  def increment
    # update the state held in sesion
    session[:count] = session.fetch(:count, 0) + 1
  end
end
