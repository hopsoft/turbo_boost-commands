import meta from '../meta'
import observable from './observable'
import { stateEvents as events } from '../events'

let state

function loadState () {
  const json = atob(meta.element.dataset.state)
  state = observable(JSON.parse(json))
}

addEventListener('DOMContentLoaded', loadState)
addEventListener('turbo:load', loadState)
addEventListener('turbo:frame-load', loadState)

addEventListener(events.stateChange, event => {
  const { state } = event.detail
  meta.element.dataset.state = btoa(JSON.stringify(state))
})

export { state }
export default {
  events,

  // UI state gets split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes.
  // A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  //
  // SEE: lib/state.rb - for info on how `state` is serialized/deserialized
  get payloadChunks () {
    return meta.element.dataset.state.match(/.{1,2000}/g)
  }
}
