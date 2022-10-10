# frozen_string_literal: true

class CounterReflex < TurboReflex::Base
  delegate :session, to: :controller

  # prevent the Rails controller/action from running
  # i.e. completely handle the response in the reflex
  prevent_controller_action

  # triggered client-side by elements with `data-turbo-reflex="CounterReflex#increment"`
  # performed server-side by an implicit controller before_action
  def increment
    # update the state held in sesion
    session[:count] = session.fetch(:count, 0) + 1
  end
end
