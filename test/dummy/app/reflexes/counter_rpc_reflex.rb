# frozen_string_literal: true

class CounterRpcReflex < TurboReflex::Base
  delegate :session, to: :controller

  prevent_controller_action

  def increment
    session[:rpc_count] = session.fetch(:rpc_count, 0) + 1
    morph "#rpc", render("demos/increment/rpc")
  end
end
