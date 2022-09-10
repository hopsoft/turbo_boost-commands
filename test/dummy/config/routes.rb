# frozen_string_literal: true

Rails.application.routes.draw do
  resources :demos, only: %i[index show update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "demos#index"
end
