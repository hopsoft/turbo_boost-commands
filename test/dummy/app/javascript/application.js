// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import '@hotwired/turbo-rails'

import debounced from 'debounced'
debounced.initialize({
  ...debounced.events,
  'turbo:load': { wait: 150 },
  'turbo-reflex:finish': { wait: 150 }
})

import TurboReady from 'turbo_ready'
TurboReady.initialize(Turbo.StreamActions)
self.TurboReady = TurboReady

import 'turbo_reflex'
TurboReflex.logger.level = 'debug'

import './controllers'
import './activity'

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
