// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import '@hotwired/turbo-rails'
import 'flowbite'
import TurboReady from 'turbo_ready'
import TurboReflex from 'turbo_reflex'

TurboReady.initialize(Turbo.StreamActions)
TurboReflex.logLevel = 'debug'

window.TurboReady = TurboReady
window.TurboReflex = TurboReflex

import debounced from 'debounced'
debounced.initialize({
  ...debounced.events,
  'turbo-reflex:finish': { wait: 150 }
})

import './controllers'

// Force all scripts in <head> to reload/reparse after a Turbo visit.
// This ensures that libs which don't work with Turbo Drive...
// (i.e. the body being replaced without reparsing scripts in <head>)
// ...will continue to work.
function reloadScripts () {
  document.querySelectorAll('head script').forEach(el => {
    console.log('reloading script', el)
    const parent = el.parentNode
    el.remove()
    parent.appendChild(el)
  })
}
//document.addEventListener('turbo:load', reloadScripts)
document.addEventListener('debounced:turbo-reflex:finish', reloadScripts)

// for debugging
// const lifecycleEventNames = [
//   'turbo-reflex:before-start',
//   'turbo-reflex:start',
//   'turbo-reflex:finish',
//   'turbo-reflex:error',
//   'turbo-reflex:missing-frame-id',
//   'turbo-reflex:missing-frame',
//   'turbo-reflex:missing-frame-src'
// ]
//
// lifecycleEventNames.forEach(name =>
//   document.addEventListener(name, event => console.log(name, event.detail))
// )
