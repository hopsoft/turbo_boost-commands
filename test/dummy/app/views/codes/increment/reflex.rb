# frozen_string_literal: true

class IncrementReflex < TurboReflex::Base
  delegate :session, to: :controller

  # triggered client-side by elements with `data-turbo-reflex="IncrementReflex#increment"`
  # performed server-side by an implicit controller before_action
  def increment
    # update the state held in sesion
    session[:count] = session.fetch(:count, 0) + 1
  end
end
