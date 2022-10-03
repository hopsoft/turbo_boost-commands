// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import '@hotwired/turbo-rails'
import 'flowbite'
import TurboReady from 'turbo_ready'
import TurboReflex from 'turbo_reflex'

TurboReady.initialize(Turbo.StreamActions)
TurboReflex.logger.level = 'debug'

window.TurboReady = TurboReady
window.TurboReflex = TurboReflex

import debounced from 'debounced'
debounced.initialize({
  ...debounced.events,
  'turbo:load': { wait: 150 },
  'turbo-reflex:finish': { wait: 150 }
})

import './controllers'

// Force all scripts in <head> to reload/reparse after a Turbo visit.
// This ensures that libs which don't work with Turbo Drive...
// (i.e. the body being replaced without reparsing scripts in <head>)
// ...will continue to work.
// function reloadScripts () {
//   const head = document.querySelector('head')
//   head.querySelectorAll('script').forEach(script => {
//     script.remove()
//     head.insertAdjacentHTML('beforeend', script.outerHTML)
//     console.log('reload script', script.outerHTML)
//   })
// }
// document.addEventListener('debounced:turbo:load', reloadScripts)
// document.addEventListener('debounced:turbo-reflex:finish', reloadScripts)
