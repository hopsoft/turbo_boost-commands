# frozen_string_literal: true

require "bundler/setup"
require "bundler/gem_tasks"
require "rake/testtask"

APP_RAKEFILE = File.expand_path("test/dummy/Rakefile", __dir__)
load "rails/tasks/engine.rake"
load "rails/tasks/statistics.rake"

Rake::TestTask.new do |test|
  test.libs << "test"

  test.test_files = if ARGV.length > 1
    FileList[ARGV[1..]]
  else
    FileList["test/**/*_test.rb"]
  end

  test.warning = false
end

task default: :test
