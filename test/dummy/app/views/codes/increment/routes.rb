# frozen_string_literal: true

Rails.application.routes.draw do
  resource :demo, only: [:show]
end
