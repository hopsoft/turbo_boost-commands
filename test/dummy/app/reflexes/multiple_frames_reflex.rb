# frozen_string_literal: true

class MultipleFramesReflex < TurboReflex::Base
  def update
    controller.session[element.dataset.key] = controller.session[element.dataset.key].to_i + 1
  end

  def reset
    controller.session[element.dataset.key] = 0
  end
end
