# frozen_string_literal: true

# Configure Rails Environment
ENV["RAILS_ENV"] = "test"

require "amazing_print"
require "pry-byebug"
require "minitest/reporters"
Minitest::Reporters.use! Minitest::Reporters::SpecReporter.new

require_relative "../test/dummy/config/environment"
# migrations_dir = File.expand_path("dummy/db/migrate", __dir__)
# ActiveRecord::MigrationContext.new(migrations_dir).migrate
ActiveRecord::Migrator.migrations_paths = [File.expand_path("../test/dummy/db/migrate", __dir__)]
ActiveRecord::Migrator.migrations_paths << File.expand_path("../db/migrate", __dir__)
require "rails/test_help"
