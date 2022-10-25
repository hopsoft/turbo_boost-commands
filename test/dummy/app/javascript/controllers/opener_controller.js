import TurboReflex from 'turbo_reflex'
import { Controller } from '@hotwired/stimulus'

const ui = TurboReflex.state.payload

export default class extends Controller {
  static values = {
    controls: String
  }

  toggle () {
    this.state = this.state === 'open' ? 'closed' : 'open'

    if (this.state === 'open') {
      this.controlsTarget.classList.remove('hidden')
    } else {
      this.controlsTarget.classList.add('hidden')
    }
  }

  get key () {
    return this.controlsValue
  }

  get state () {
    if (!ui[this.key]) this.state = 'closed'
    return ui[this.key]
  }

  set state (value) {
    ui[this.key] = value
  }

  get controlsTarget () {
    return document.getElementById(this.controlsValue)
  }
}
