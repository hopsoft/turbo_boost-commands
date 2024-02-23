# frozen_string_literal: true

require "bundler/setup"

APP_RAKEFILE = File.expand_path("test/dummy/Rakefile", __dir__)

load "rails/tasks/engine.rake"
load "rails/tasks/statistics.rake"
require "bundler/gem_tasks"

desc "Run tests"
task :test, [:file] do |_, args|
  command = (ARGV.length > 1) ?
    "bin/rails test #{ARGV[1..].join(" ")}" :
    "bin/rails test:all"
  puts command
  exec command
end

task default: :test
