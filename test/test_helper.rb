# frozen_string_literal: true

# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require "pry-byebug"
require "minitest/reporters"
Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new

require_relative "../test/dummy/config/environment"
ActiveRecord::Migrator.migrations_paths = [File.expand_path("../test/dummy/db/migrate", __dir__)]
ActiveRecord::Migrator.migrations_paths << File.expand_path("../db/migrate", __dir__)
require "rails/test_help"

# Load fixtures from the engine
if ActiveSupport::TestCase.respond_to?(:fixture_paths=)
  ActiveSupport::TestCase.fixture_paths = [File.expand_path("fixtures", __dir__)]
  ActionDispatch::IntegrationTest.fixture_paths = ActiveSupport::TestCase.fixture_paths
  ActiveSupport::TestCase.file_fixture_path = File.expand_path("fixtures", __dir__) + "/files"
  ActiveSupport::TestCase.fixtures :all
end

# ActionCable.server.config.logger = Logger.new($stdout) if ENV["VERBOSE"]
#
# module ActionViewTestCaseExtensions
#  def render(...)
#    ApplicationController.renderer.render(...)
#  end
# end
#
# class ActiveSupport::TestCase
#  include ActiveJob::TestHelper
#  fixtures :all
# end
#
# class ActionDispatch::IntegrationTest
#  include ActionViewTestCaseExtensions
# end
#
# class ActionCable::Channel::TestCase
#  include ActionViewTestCaseExtensions
# end
