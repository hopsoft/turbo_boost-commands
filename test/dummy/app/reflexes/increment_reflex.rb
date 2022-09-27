# frozen_string_literal: true

class IncrementReflex < TurboReflex::Base
  delegate :session, to: :controller

  def increment
    key = element.data_session_key
    session[key] = session.fetch(key, 0) + 1
  end
end
