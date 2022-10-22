import meta from './meta'

class UiState {
  get base64 () {
    return meta.element.dataset.uiState
  }

  // UI state gets split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes.
  // A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  //
  // SEE: lib/ui_state.rb - for info on how UiState is serialized/deserialized
  get base64Chunks () {
    return this.base64.match(/.{1,2000}/g)
  }

  get json () {
    return atob(this.base64)
  }

  get data () {
    return JSON.parse(this.json)
  }

  set data (value = {}) {
    meta.element.dataset.uiState = btoa(JSON.stringify(value))
    return value
  }

  update (value = {}) {
    this.data = { ...this.data, ...value }
  }
}

export default new UiState()
