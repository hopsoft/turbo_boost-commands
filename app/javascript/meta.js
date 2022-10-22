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
}

export default new Meta()
