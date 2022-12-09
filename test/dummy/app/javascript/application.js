// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import '@hotwired/turbo-rails'
import debounced from 'debounced'
import 'turbo_reflex'
import './controllers'
import './activity'

debounced.initialize({
  ...debounced.events,
  'turbo:load': { wait: 150 },
  'turbo-reflex:finish': { wait: 150 }
})

TurboReflex.logger.level = 'debug'

// Force all scripts in <head> to reload/reparse after a Turbo visit.
// This ensures that libs which don't work with Turbo Drive...
// (i.e. the body being replaced without reparsing scripts in <head>)
// ...will continue to work.
// document.addEventListener('debounced:turbo:load', event => {
//   document.querySelectorAll('script[type=importmap]').forEach(el => {
//     const parent = el.parentNode
//     el.remove()
//     parent.appendChild(el)
//   })
// })
