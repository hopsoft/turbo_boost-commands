# frozen_string_literal: true

class DemosController < ApplicationController
  # reflexes are invoked implicitly by a before_action

  def show
    # ...
  end

  def update
    # controller logic...
    # renders app/views/demos/show.html.erb
  end
end
