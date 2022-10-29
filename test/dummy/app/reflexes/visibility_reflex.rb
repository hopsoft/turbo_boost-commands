# frozen_string_literal: true

class VisibilityReflex < TurboReflex::Base
  prevent_controller_action

  delegate :turbo_frame_tag, :demo_turbo_frame_tag, to: :"controller.view_context"

  def toggle
    state[element.dataset.id, :visible] = !visible?

    html = render(partial: element.dataset.partial,
      locals: {
        id: element.dataset.id,
        title: element.dataset.title.html_safe,
        frame: element.dataset.try(:frame)
      })

    streams << turbo_stream.invoke("morph", args: [html], selector: element.dataset.selector)
  end

  private

  def visible?
    !!state[element.dataset.id, :visible]
  end
end
