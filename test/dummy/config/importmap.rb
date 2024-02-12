# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin "@hotwired/stimulus", to: "@hotwired--stimulus.js" # @3.2.2
pin "@hotwired/turbo", to: "@hotwired--turbo.js" # @8.0.2
pin "@hotwired/turbo-rails", to: "@hotwired--turbo-rails.js" # @8.0.2
pin "@rails/actioncable", to: "@rails--actioncable.js" # @7.1.3
pin "@rails/actioncable/src", to: "@rails--actioncable--src.js" # @7.1.3

# TODO: I have no idea why the fuck jspm.io refuses to build the latest versions of @turbo-boost libs
#       You can generate URLs like the one I'm using below here → https://www.jsdelivr.com/github
pin "@turbo-boost/streams", to: "https://cdn.jsdelivr.net/gh/hopsoft/turbo_boost-streams@v0.1.6/app/assets/builds/%40turbo-boost/streams.js"

# NOTE: The following libs stop working if we allow Rails to vendor them
pin "flowbite", to: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.turbo.min.js"

# HACK: This allows us to pin a lib above Rails.root in the dummy app
#       It's goofy but works
FileUtils.rm_f Rails.root.join("app/javascript/@turbo-boost")
FileUtils.ln_s Rails.root.join("../../app/assets/builds/@turbo-boost"), Rails.root.join("app/javascript/@turbo-boost")
pin "@turbo-boost/commands", to: "@turbo-boost/commands.js"

pin "application", preload: true
pin "alpinejs" # @3.13.5
pin "@alpinejs/morph", to: "@alpinejs--morph.js" # @3.13.5
