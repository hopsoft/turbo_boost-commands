# frozen_string_literal: true

class DemosCommand < TurboBoost::Commands::Command
  prevent_controller_action

  def toggle
    state.now[:active_demo] = element.aria.visible? ? nil : element.aria.controls
    morph id: "#{demo_id}-demos", html: render("demos/#{demo_id}/demos")
  end

  private

  def demo_id
    controller.params[:id]
  end
end
