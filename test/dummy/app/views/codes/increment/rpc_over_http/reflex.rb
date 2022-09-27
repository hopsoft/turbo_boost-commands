# frozen_string_literal: true

class IncrementReflex < TurboReflex::Base
  delegate :session, to: :controller

  def increment
    session[:rpc_count] = session.fetch(:rpc_count, 0) + 1
    turbo_streams << turbo_stream.replace("rpc", partial: "path/to/partial")
  end
end
