# frozen_string_literal: true

class MultipleFramesCommand < TurboBoost::Commands::Command
  def update
    controller.session[element.data.key] = controller.session[element.data.key].to_i + 1
  end

  def reset
    controller.session[element.data.key] = 0
  end
end
