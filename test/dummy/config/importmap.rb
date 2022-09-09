# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin "@hotwired/turbo", to: "https://ga.jspm.io/npm:@hotwired/turbo@7.1.0/dist/turbo.es2017-esm.js"
pin "@hotwired/turbo-rails", to: "https://ga.jspm.io/npm:@hotwired/turbo-rails@7.1.3/app/javascript/turbo/index.js"
pin "@rails/actioncable/src", to: "https://ga.jspm.io/npm:@rails/actioncable@7.0.3/src/index.js"

# this pin works because of the link_tree directive in: test/dummy/app/assets/config/manifest.js
# that points to the relative path of the build directory for turbo_reflex.js
# SEE: package.json for details on the build script
pin "turbo_reflex", to: "turbo_reflex.min.js"

pin "application", preload: true