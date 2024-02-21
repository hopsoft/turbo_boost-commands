# frozen_string_literal: true

Rails.application.routes.draw do
  get "health", to: ->(_env) { [204, {}, [""]] }

  draw :marketing
  draw :docs
  draw :demos
  draw :tests

  root "features#index"
end
