# frozen_string_literal: true

class CounterCommand < TurboBoost::Commands::Command
  delegate :session, to: :controller

  def increment
    key = element.dataset.session_key
    session[key] = session[key].to_i + 1
  end
end
