import meta from '../meta'
import observable from './observable'
import { stateEvents as events } from '../events'

export default {
  events,

  // UI state gets split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes.
  // A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  //
  // SEE: lib/state.rb - for info on how `state` is serialized/deserialized
  get base64Chunks () {
    const base64 = meta.element.dataset.state
    return base64.match(/.{1,2000}/g)
  },

  get data () {
    const base64 = meta.element.dataset.state
    const json = atob(base64)
    return observable(JSON.parse(json))
  }
}
