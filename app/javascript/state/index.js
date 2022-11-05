import meta from '../meta'
import observable from './observable'
import { dispatch, stateEvents as events } from '../events'

let loadedState, currentState, changedState
let observer

function loadState () {
  const json = atob(meta.element.dataset.state)
  changedState = {}
  currentState = observable(JSON.parse(json))
  loadedState = { ...currentState }
  delete meta.element.dataset.clientStateChange
  setTimeout(() =>
    dispatch(events.stateLoad, meta.element, { state: currentState })
  )
}

function metaMutated (mutations) {
  if (meta.element.dataset.clientStateChange) return
  mutations.forEach(m => {
    if (m.attributeName === 'data-state') loadState()
  })
}

function initObserver () {
  if (observer) return
  observer = new MutationObserver(metaMutated)
  observer.observe(meta.element, { attributes: true })
}

if (meta.element) {
  loadState()
  initObserver()
} else {
  addEventListener('DOMContentLoaded', loadState)
  addEventListener('DOMContentLoaded', initObserver)
}
addEventListener('turbo:load', initObserver)
addEventListener('turbo:frame-load', initObserver)

addEventListener(events.stateChange, event => {
  changedState = {}
  for (const [key, value] of Object.entries(currentState))
    if (loadedState[key] !== value) changedState[key] = value
  meta.element.dataset.clientStateChange = true
  meta.element.dataset.state = btoa(JSON.stringify(currentState))
})

export default {
  events,

  get current () {
    return currentState
  },

  // The UI state changes are split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes.
  // A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  //
  // SEE: lib/state.rb - for info on how `state` is serialized/deserialized
  get payloadChunks () {
    return btoa(JSON.stringify(changedState)).match(/.{1,2000}/g)
  }
}
