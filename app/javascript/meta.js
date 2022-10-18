class Meta {
  get element () {
    return document.querySelector('meta[name="turbo-reflex"]')
  }

  get token () {
    return this.element.getAttribute('content')
  }

  get busy () {
    return this.element.dataset.busy === 'true'
  }

  set busy (value) {
    return (this.element.dataset.busy = !!value)
  }

  get uiStateBase64 () {
    return this.element.dataset.uiState
  }

  // UI state gets split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes.
  // A Base64 character is an 8-bit-padded ASCII character... or 1 byte
  //
  // SEE: lib/ui_state.rb - for info on how UiState is serialized/deserialized
  get uiStateBase64Chunks () {
    return this.uiStateBase64.match(/.{1,2000}/g)
  }

  get uiStateJSON () {
    return atob(this.uiStateBase64)
  }

  get uiState () {
    return JSON.parse(this.uiStateJSON)
  }
}

export default new Meta()
