# frozen_string_literal: true

require "turbo-rails"
require "turbo_boost/streams"
require "universalid"
require_relative "version"
require_relative "http_status_codes"
require_relative "errors"
require_relative "patches"
require_relative "sanitizer"
require_relative "middlewares/entry_middleware"
require_relative "middlewares/exit_middleware"
require_relative "command"
require_relative "controller_pack"
require_relative "../../../app/controllers/concerns/turbo_boost/commands/controller"
require_relative "../../../app/helpers/turbo_boost/commands/application_helper"

module TurboBoost::Commands
  def self.config
    Rails.application.config.turbo_boost_commands
  end

  class Engine < ::Rails::Engine
    config.turbo_boost_commands = ActiveSupport::OrderedOptions.new
    config.turbo_boost_commands[:alert_on_abort] = false # (true, false, "development", "test", "production")
    config.turbo_boost_commands[:alert_on_error] = false # (true, false, "development", "test", "production")
    config.turbo_boost_commands[:precompile_assets] = true # (true, false)
    config.turbo_boost_commands[:raise_on_invalid_command] = "development" # (true, false, "development", "test", "production")
    config.turbo_boost_commands[:resolve_state] = false # (true, false)

    initializer "turbo_boost_commands.configuration", before: :build_middleware_stack do |app|
      Mime::Type.register "text/vnd.turbo-boost.html", :turbo_boost

      app.middleware.insert 0, TurboBoost::Commands::EntryMiddleware
      app.middleware.use TurboBoost::Commands::ExitMiddleware

      ActiveSupport.on_load :action_controller_base do
        # `self` is ActionController::Base
        include TurboBoost::Commands::Controller
        helper TurboBoost::Commands::ApplicationHelper
      end

      ActiveSupport.on_load :action_view do
        # `self` is ActionView::Base
        ActionView::Helpers::TagHelper::TagBuilder.prepend TurboBoost::Commands::Patches::ActionViewHelpersTagHelperTagBuilderPatch
      end
    end

    initializer "turbo_boost_commands.asset" do
      config.after_initialize do |app|
        if app.config.respond_to?(:assets) && app.config.turbo_boost_commands.precompile_assets
          app.config.assets.precompile += %w[@turbo-boost/commands.js]
        end
      end
    end
  end
end
