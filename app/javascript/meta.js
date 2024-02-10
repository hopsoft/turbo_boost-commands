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

  // mutable and optimistic client side state
  get client() {
    return JSON.parse(this.element.dataset.client)
  }

  set client(value = {}) {
    return (this.element.dataset.client = JSON.stringify(value))
  }

  // mutable and optimistic client side state
  get delta() {
    return this.element.dataset.delta ? JSON.parse(this.element.dataset.delta) : {}
  }

  set delta(value = {}) {
    return (this.element.dataset.delta = JSON.stringify(value))
  }

  // immutable server side state - from the last command
  get server() {
    return this.element.dataset.server
  }
}

export default new Meta()
