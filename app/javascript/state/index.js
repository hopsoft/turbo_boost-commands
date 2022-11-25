import meta from '../meta'
import observable from './observable'
import { dispatch, stateEvents as events } from '../events'

let loadedState, currentState, changedState
let loadStateTimeout

function loadState () {
  if (!meta.element) return loadStateLater()
  const json = atob(meta.element.dataset.state)
  changedState = {}
  currentState = observable(JSON.parse(json))
  loadedState = { ...currentState }
  delete meta.element.dataset.clientStateChange
  setTimeout(() =>
    dispatch(events.stateLoad, meta.element, { state: currentState })
  )
}

function loadStateLater () {
  clearTimeout(loadStateTimeout)
  loadStateTimeout = setTimeout(loadState, 10)
}

if (!loadedState) loadState()

addEventListener('DOMContentLoaded', loadStateLater)
addEventListener('load', loadStateLater)
addEventListener('turbo:load', loadStateLater)
addEventListener('turbo:frame-load', loadStateLater)
addEventListener('turbo-reflex:success', loadStateLater)

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

  get delta () {
    return changedState
  },

  // The UI state changes are split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes.
  // A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  //
  // SEE: lib/state.rb - for info on how `state` is serialized/deserialized
  get payloadChunks () {
    return btoa(JSON.stringify(currentState)).match(/.{1,2000}/g)
  }
}
