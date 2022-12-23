# frozen_string_literal: true

# This file is used by Rack-based servers to start the application.

require_relative "config/environment"

# Add support for reverse proxying this app at a given path
# NOTE: RAILS_RELATIVE_URL_ROOT is set in fly.toml
# SEE: https://gist.github.com/ebeigarts/5450422
map ENV["RAILS_RELATIVE_URL_ROOT"] || "/" do
  run Rails.application
  Rails.application.load_server
end
