# frozen_string_literal: true

Rails.application.routes.draw do
  resources :posts
  resource :reflex_tests, only: %i[show]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "reflex_tests#show"
end
