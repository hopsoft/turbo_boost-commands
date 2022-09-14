# frozen_string_literal: true

require "turbo-rails"
require_relative "version"
require_relative "errors"
require_relative "sanitizer"
require_relative "base"

class TurboReflex::Engine < ::Rails::Engine
  # isolate_namespace TurboReflex

  config.turbo_reflex = ActiveSupport::OrderedOptions.new
  initializer "turbo_reflex.configuration" do
    config.to_prepare do |app|
      ::ApplicationController.send :include, TurboReflex::Controller
    end

    config.after_initialize do |app|
      app.routes.draw do
        mount TurboReflex::Engine => "/turbo_reflex"
      end
    end
  end
end
