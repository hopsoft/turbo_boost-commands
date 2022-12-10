# frozen_string_literal: true

require "turbo-rails"
require "turbo_ready"
require_relative "version"
require_relative "base"
require_relative "controller_pack"

module TurboReflex
  def self.config
    Rails.application.config.turbo_reflex
  end

  class Engine < ::Rails::Engine
    config.turbo_reflex = ActiveSupport::OrderedOptions.new
    config.turbo_reflex[:max_cookie_size] = ActionDispatch::Cookies::MAX_COOKIE_SIZE / 3
    config.turbo_reflex[:validate_client_token] = true

    # must opt-in to state overrides
    config.turbo_reflex[:apply_client_state_overrides] = false
    config.turbo_reflex[:apply_server_state_overrides] = false

    initializer "turbo_reflex.configuration" do
      Mime::Type.register "text/vnd.turbo-reflex.html", :turbo_reflex

      ActiveSupport.on_load(:action_controller_base) do
        include TurboReflex::Controller
      end
    end
  end
end
