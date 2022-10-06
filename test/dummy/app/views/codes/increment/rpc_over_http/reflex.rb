# frozen_string_literal: true

class CounterReflex < TurboReflex::Base
  delegate :session, to: :controller

  def increment
    session[:count] = session.fetch(:count, 0) + 1
    turbo_streams << turbo_stream.replace("counter", partial: "app/views/demos/_counter")
  end
end
