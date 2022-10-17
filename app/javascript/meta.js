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

  get uiState () {
    return this.element.dataset.uiState
  }

  // UI state gets split into chunks and sent to the server in an HTTP request header.
  // Max size for an HTTP header is around 4k or 4,000 bytes so we chunk at 3k.
  get uiStateChunks () {
    const state = this.element.dataset.uiState
    const size = new Blob([state]).size
    const chunks = Math.ceil(size / 3000)
    const max = Math.ceil(state.length / chunks)
    const regex = new RegExp(`.{1,${max}}`, 'g')
    return state.match(regex)
  }
}

export default new Meta()
