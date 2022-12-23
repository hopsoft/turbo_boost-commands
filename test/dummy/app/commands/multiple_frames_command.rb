# frozen_string_literal: true

class MultipleFramesCommand < TurboBoost::Commands::Command
  def update
    controller.session[element.dataset.key] = controller.session[element.dataset.key].to_i + 1
  end

  def reset
    controller.session[element.dataset.key] = 0
  end
end
