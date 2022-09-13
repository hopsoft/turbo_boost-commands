// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails

import '@hotwired/turbo-rails'
import TurboReady from 'turbo_ready'
import TurboReflex from 'turbo_reflex'

TurboReady.initialize(Turbo.StreamActions)

window.TurboReady = TurboReady
window.TurboReflex = TurboReflex

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
