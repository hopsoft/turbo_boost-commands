# frozen_string_literal: true

resources :features, only: [:index]
resources :todos, only: [:index]
resources :sponsors, only: [:index]

root "features#index"
