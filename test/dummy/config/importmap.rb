# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

target = File.expand_path(Rails.root.join("../../app/assets/builds/@turbo-boost"))
link = File.expand_path(Rails.root.join("app/javascript/@turbo-boost"))
FileUtils.rm_r link, force: true, verbose: true if File.exist?(link) && !File.symlink?(link)
FileUtils.ln_s target, link, force: true, verbose: true unless File.exist?(link)

pin "@hotwired/stimulus", to: "https://ga.jspm.io/npm:@hotwired/stimulus@3.2.1/dist/stimulus.js"
pin "@hotwired/turbo", to: "https://ga.jspm.io/npm:@hotwired/turbo@7.3.0/dist/turbo.es2017-esm.js"
pin "@hotwired/turbo-rails", to: "https://ga.jspm.io/npm:@hotwired/turbo-rails@7.3.0/app/javascript/turbo/index.js"
pin "@rails/actioncable/src", to: "https://ga.jspm.io/npm:@rails/actioncable@7.0.6/src/index.js"
pin "debounced", to: "https://ga.jspm.io/npm:debounced@0.0.5/src/index.js"
pin "flowbite", to: "https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.7.0/flowbite.turbo.min.js"
pin "@turbo-boost/commands", to: "@turbo-boost/commands.js"
pin "application", preload: true
