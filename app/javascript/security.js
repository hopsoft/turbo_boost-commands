const Security = {
  get token () {
    return document.getElementById('turbo-reflex-token').getAttribute('content')
  }
}

export default Security
