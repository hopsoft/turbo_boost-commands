# frozen_string_literal: true

# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require "pry-byebug"

require_relative "../test/dummy/config/environment"
ActiveRecord::Migrator.migrations_paths = [File.expand_path("../test/dummy/db/migrate", __dir__)]
require "rails/test_help"

ActionCable.server.config.logger = Logger.new($stdout) if ENV["VERBOSE"]

module ActionViewTestCaseExtensions
  def render(...)
    ApplicationController.renderer.render(...)
  end
end

class ActiveSupport::TestCase
  include ActiveJob::TestHelper
end

class ActionDispatch::IntegrationTest
  include ActionViewTestCaseExtensions
end

class ActionCable::Channel::TestCase
  include ActionViewTestCaseExtensions
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [1400, 1400]
end

Capybara.configure do |config|
  config.server = :puma, {Silent: true}
end
