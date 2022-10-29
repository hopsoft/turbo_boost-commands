import meta from '../meta'
import observable from './observable'
import { stateEvents as events } from '../events'

export default {
  events,

  get base64 () {
    return meta.element.dataset.state
  },

  // UI state gets split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes.
  // A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  //
  // SEE: lib/state.rb - for info on how `state` is serialized/deserialized
  get base64Chunks () {
    return this.base64.match(/.{1,2000}/g)
  },

  // TODO: Update `data` to be perisistent and refresh only when `meta.element.dataset.state` is mutated.
  get data () {
    const json = atob(this.base64)
    return observable(JSON.parse(json))
  }
}
