# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin "@hotwired/stimulus", to: "https://ga.jspm.io/npm:@hotwired/stimulus@3.2.1/dist/stimulus.js"
pin "@hotwired/turbo", to: "https://ga.jspm.io/npm:@hotwired/turbo@7.2.4/dist/turbo.es2017-esm.js"
pin "@hotwired/turbo-rails", to: "https://ga.jspm.io/npm:@hotwired/turbo-rails@7.2.4/app/javascript/turbo/index.js"
pin "@rails/actioncable/src", to: "https://ga.jspm.io/npm:@rails/actioncable@7.0.4/src/index.js"
pin "debounced", to: "https://ga.jspm.io/npm:debounced@0.0.5/src/index.js"

FileUtils.rm_f Rails.root.join("app/javascript/@turbo-boost")
FileUtils.ln_s Rails.root.join("../../app/assets/builds/@turbo-boost"), Rails.root.join("app/javascript/@turbo-boost")
pin "@turbo-boost/commands", to: "@turbo-boost/commands.js"

pin "application", preload: true
