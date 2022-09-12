# frozen_string_literal: true

class MultipleFramesReflex < TurboReflex::Base
  def update
    controller.session[element.data_key] = controller.session[element.data_key].to_i + 1
  end

  def reset
    controller.session[element.data_key] = 0
  end
end
