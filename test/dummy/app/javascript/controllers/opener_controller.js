import { uiState as ui } from 'turbo_reflex'
import { Controller } from '@hotwired/stimulus'

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
    if (!ui.data[this.key]) this.state = 'closed'
    return ui.data[this.key]
  }

  set state (value) {
    ui.update({ [this.key]: value })
  }

  get controlsTarget () {
    return document.getElementById(this.controlsValue)
  }
}
