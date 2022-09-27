# frozen_string_literal: true

class CounterRpcReflex < TurboReflex::Base
  delegate :session, to: :controller

  def increment
    session[:rpc_count] = session.fetch(:rpc_count, 0) + 1
    turbo_streams << turbo_stream.replace("rpc", partial: "demos/increment_rpc")
  end
end
