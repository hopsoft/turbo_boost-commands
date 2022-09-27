# frozen_string_literal: true

class DemosController < ApplicationController
  # reflexes are invoked implicitly by a before_action

  def show
    # controller logic...
    # renders app/views/demos/show.html.erb
  end
end
