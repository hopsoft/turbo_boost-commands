# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin "@alpinejs/morph", to: "https://ga.jspm.io/npm:@alpinejs/morph@3.10.5/dist/module.esm.js"
pin "@hotwired/stimulus", to: "https://ga.jspm.io/npm:@hotwired/stimulus@3.1.1/dist/stimulus.js"
pin "@hotwired/turbo", to: "https://ga.jspm.io/npm:@hotwired/turbo@7.2.4/dist/turbo.es2017-esm.js"
pin "@hotwired/turbo-rails", to: "https://ga.jspm.io/npm:@hotwired/turbo-rails@7.2.4/app/javascript/turbo/index.js"
pin "@rails/actioncable/src", to: "https://ga.jspm.io/npm:@rails/actioncable@7.0.4/src/index.js"
pin "alpinejs", to: "https://ga.jspm.io/npm:alpinejs@3.10.5/dist/module.esm.js"
pin "debounced", to: "https://ga.jspm.io/npm:debounced@0.0.5/src/index.js"
pin "turbo_ready", to: "https://ga.jspm.io/npm:turbo_ready@0.1.2/app/javascript/index.js"

# this pin works because of the link_tree directive in: test/dummy/app/assets/config/manifest.js
# that points to the relative path of the build directory for turbo_reflex.js
# SEE: package.json for details on the build script
pin "turbo_reflex", to: "turbo_reflex.js"

pin "application", preload: true
