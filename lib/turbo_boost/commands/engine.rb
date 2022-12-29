# frozen_string_literal: true

require "turbo-rails"
require "turbo_boost/streams"
require_relative "version"
require_relative "patches"
require_relative "command"
require_relative "controller_pack"
require_relative "../../../app/controllers/concerns/turbo_boost/commands/controller"

module TurboBoost::Commands
  def self.config
    Rails.application.config.turbo_boost_commands
  end

  class Engine < ::Rails::Engine
    config.turbo_boost_commands = ActiveSupport::OrderedOptions.new
    config.turbo_boost_commands[:max_cookie_size] = ActionDispatch::Cookies::MAX_COOKIE_SIZE / 3
    config.turbo_boost_commands[:validate_client_token] = true

    # must opt-in to state overrides
    config.turbo_boost_commands[:apply_client_state_overrides] = false
    config.turbo_boost_commands[:apply_server_state_overrides] = false

    initializer "turbo_boost_commands.configuration" do
      Mime::Type.register "text/vnd.turbo-boost.html", :turbo_boost

      ActiveSupport.on_load :action_controller_base do
        # `self` is ActionController::Base
        include TurboBoost::Commands::Controller
      end

      ActiveSupport.on_load :action_view do
        ActionView::Helpers::TagHelper::TagBuilder.prepend TurboBoost::Commands::Patches::ActionViewHelpersTagHelperTagBuilderPatch
      end
    end
  end
end
