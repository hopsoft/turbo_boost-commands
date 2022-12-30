# frozen_string_literal: true

class CounterRpcCommand < TurboBoost::Commands::Command
  prevent_controller_action

  delegate :session, to: :controller

  def increment
    session[:rpc_count] = session.fetch(:rpc_count, 0) + 1
    morph id: "rpc", html: render("demos/increment/rpc")
  end
end
