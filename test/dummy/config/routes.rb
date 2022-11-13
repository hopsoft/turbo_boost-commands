# frozen_string_literal: true

Rails.application.routes.draw do
  resources :frames, only: [:show, :update]
  resources :demos, only: %i[index show]
  resources :docs, only: %i[index show]
  resource :session, only: %i[destroy]
  resource :articles, only: %i[index show]
  root "articles#index"
end
