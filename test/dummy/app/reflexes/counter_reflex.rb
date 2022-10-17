# frozen_string_literal: true

class CounterReflex < TurboReflex::Base
  delegate :session, to: :controller

  def increment
    key = element.dataset.ui_state_key
    ui_state[key] = ui_state.fetch(key, 0).to_i + 1
  end
end
