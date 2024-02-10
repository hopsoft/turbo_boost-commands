class Meta {
  get element() {
    return document.querySelector('meta[name="turbo-boost"]')
  }

  // token that can be used to verify the authenticity of a command
  get token() {
    return this.element.getAttribute('content')
  }

  // indicates if a command is active
  get busy() {
    return this.element.dataset.busy === 'true'
  }

  set busy(value = false) {
    return (this.element.dataset.busy = !!value)
  }

  // mutable state representation for use on the client
  get state() {
    return this.element.dataset.state
  }

  // signed and immutable server state determined by the last command
  get signedState() {
    return this.element.dataset.signedState
  }
}

export default new Meta()
