// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import '@hotwired/turbo-rails'
import 'flowbite'
import TurboReady from 'turbo_ready'
import TurboReflex from 'turbo_reflex'

TurboReady.initialize(Turbo.StreamActions)

window.TurboReady = TurboReady
window.TurboReflex = TurboReflex

import './controllers'

// Force all scripts in <head> to reload/reparse after a Turbo visit.
// This ensures that libs which don't work with Turbo Drive...
// (i.e. the body being replaced without reparsing scripts in <head>)
// ...will continue to work.
document.addEventListener('turbo:load', event => {
  document.querySelectorAll('script[type=importmap]').forEach(el => {
    const parent = el.parentNode
    el.remove()
    parent.appendChild(el)
  })
})

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
