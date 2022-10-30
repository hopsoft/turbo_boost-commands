import meta from '../meta'
import observable from './observable'
import { stateEvents as events } from '../events'

let oldState, state, changedState

function loadState () {
  const json = atob(meta.element.dataset.state)
  changedState = {}
  oldState = state = observable(JSON.parse(json))
}

addEventListener('DOMContentLoaded', loadState)
addEventListener('turbo:load', loadState)
addEventListener('turbo:frame-load', loadState)

addEventListener(
  events.beforeStateChange,
  event => (oldState = JSON.parse(JSON.stringify(state)))
)

addEventListener(events.stateChange, event => {
  changedState = {}
  for (const [key, value] of Object.entries(state))
    if (oldState[key] !== value) changedState[key] = value
  meta.element.dataset.state = btoa(JSON.stringify(state))
})

export { state }
export default {
  events,

  // The UI state changes are split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes.
  // A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  //
  // SEE: lib/state.rb - for info on how `state` is serialized/deserialized
  get payloadChunks () {
    return btoa(JSON.stringify(changedState)).match(/.{1,2000}/g)
  }
}
