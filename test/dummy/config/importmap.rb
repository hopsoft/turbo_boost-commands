# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin "@hotwired/stimulus", to: "@hotwired--stimulus.js" # @3.2.2
pin "@hotwired/turbo", to: "@hotwired--turbo.js" # @8.0.2
pin "@hotwired/turbo-rails", to: "@hotwired--turbo-rails.js" # @8.0.2
pin "@rails/actioncable", to: "@rails--actioncable.js" # @7.1.3
pin "@rails/actioncable/src", to: "@rails--actioncable--src.js" # @7.1.3

# NOTE: The following libs stop working if we allow Rails to vendor them
pin "flowbite", to: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.turbo.min.js"

# HACK: This allows us to pin a lib above Rails.root in the dummy app
#       It's goofy but works
FileUtils.rm_f Rails.root.join("app/javascript/@turbo-boost")
FileUtils.ln_s Rails.root.join("../../app/assets/builds/@turbo-boost"), Rails.root.join("app/javascript/@turbo-boost")
pin "@turbo-boost/commands", to: "@turbo-boost/commands.js"

pin "application", preload: true
pin "@turbo-boost/streams", to: "@turbo-boost--streams.js" # @0.1.10
