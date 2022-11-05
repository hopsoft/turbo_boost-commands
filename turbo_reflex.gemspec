# frozen_string_literal: true

require_relative "lib/turbo_reflex/version"

Gem::Specification.new do |s|
  s.name = "turbo_reflex"
  s.version = TurboReflex::VERSION
  s.authors = ["Nate Hopkins (hopsoft)"]
  s.email = ["natehop@gmail.com"]
  s.homepage = "https://github.com/hopsoft/turbo_reflex"
  s.summary = "Reflexes for Turbo Frames that help you build robust reactive applications"
  s.description = "TurboReflex extends Turbo Frames and adds support for client triggered reflexes (think RPC) which let you sprinkle in functionality and skip the REST boilerplate."
  s.license = "MIT"

  s.metadata["homepage_uri"] = s.homepage
  s.metadata["source_code_uri"] = s.homepage
  s.metadata["changelog_uri"] = s.homepage + "/blob/master/CHANGELOG.md"

  s.files = Dir["app/**/*", "bin/*", "config/*", "lib/**/*.rb", "[A-Z]*"]

  s.add_dependency "rails", ">= 6.1"
  s.add_dependency "turbo-rails", ">= 1.1"
  s.add_dependency "turbo_ready", ">= 0.1"

  s.add_development_dependency "capybara"
  s.add_development_dependency "cuprite"
  s.add_development_dependency "foreman"
  s.add_development_dependency "importmap-rails"
  s.add_development_dependency "magic_frozen_string_literal"
  s.add_development_dependency "minitest-reporters"
  s.add_development_dependency "net-smtp"
  s.add_development_dependency "pry-byebug"
  s.add_development_dependency "pry-doc"
  s.add_development_dependency "pry-rails"
  s.add_development_dependency "puma"
  s.add_development_dependency "rake"
  s.add_development_dependency "rexml"
  s.add_development_dependency "rouge"
  s.add_development_dependency "sprockets-rails"
  s.add_development_dependency "sqlite3"
  s.add_development_dependency "standardrb"
  s.add_development_dependency "tailwindcss-rails"
  s.add_development_dependency "turbo_ready"
  s.add_development_dependency "web-console"
  s.add_development_dependency "webdrivers"
end
