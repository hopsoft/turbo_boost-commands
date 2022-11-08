# frozen_string_literal: true

class CounterReflex < TurboReflex::Base
  delegate :session, to: :controller

  def increment
    key = element.dataset.session_key
    session[key] = session[key].to_i + 1
  end
end
