# frozen_string_literal: true

Rails.application.routes.draw do
  get "health", to: ->(_env) { [204, {}, [""]] }

  resource :features, only: [:show]
  resource :installations, only: [:show]

  root "features#show"
end
