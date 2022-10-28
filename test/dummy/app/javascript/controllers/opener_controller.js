import TurboReflex from 'turbo_reflex'
import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = {
    controls: String
  }

  toggle () {
    this.visible = !this.visible

    if (this.visible) {
      this.controlsTarget.classList.remove('hidden')
    } else {
      this.controlsTarget.classList.add('hidden')
    }
  }

  get key () {
    return this.controlsValue + '/visible'
  }

  get visible () {
    return TurboReflex.state[this.key]
  }

  set visible (value) {
    TurboReflex.state[this.key] = value
  }

  get controlsTarget () {
    return document.getElementById(this.controlsValue)
  }
}
