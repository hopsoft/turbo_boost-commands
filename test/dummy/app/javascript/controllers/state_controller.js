import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static values = { attributes: Array }

  saveAttributes() {
    if (!this.entry) return
    this.entry.attributes = this.attributes
  }

  get attributes() {
    return this.attributesValue.reduce((memo, attr) => {
      memo[attr] = this.element.getAttribute(attr)
      return memo
    }, {})
  }

  get entry() {
    if (!this.element.id) return {}
    if (!this.store[this.element.id]) this.store[this.element.id] = {}
    return this.store[this.element.id]
  }

  get store() {
    return self.TurboBoost?.State?.current || {}
  }
}
