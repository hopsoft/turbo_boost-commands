# frozen_string_literal: true

Rails.application.routes.draw do
  resources :tests, only: %i[index show update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "tests#index"
end
