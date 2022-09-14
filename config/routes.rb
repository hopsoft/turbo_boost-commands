# frozen_string_literal: true

Rails.application.routes.draw do
  match "turbo_reflex", to: "turbo_reflex/turbo_reflexes#show", via: :all, as: :turbo_reflex
end
