# frozen_string_literal: true

Rails.application.routes.draw do
  resources :frames, only: [:show]
  resources :demos, only: %i[index show]
  resources :docs, only: %i[index show]
  root "demos#index"
end
