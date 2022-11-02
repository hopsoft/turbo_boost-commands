import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  connect () {
    this.scrollLater()
  }

  scroll (event) {
    const options = {
      behavior: 'instant',
      block: 'start'
    }

    this.element.scrollIntoView(options)
    this.scrollTop = this.scrollTop - this.navbar.offsetHeight
  }

  scrollLater (wait = 100) {
    setTimeout(this.scroll.bind(this), wait)
  }

  get scrollTop () {
    return document.documentElement.scrollTop
  }

  set scrollTop (value) {
    return (document.documentElement.scrollTop = value)
  }

  get navbar () {
    return document.getElementById('navbar')
  }
}
