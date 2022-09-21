import { Controller } from '@hotwired/stimulus'

export default class extends Controller {
  static targets = ['moon', 'sun']

  connect () {
    this.save(this.mode || this.defaultMode)
  }

  toggle () {
    if (this.mode === 'dark') return this.save('light')
    this.save('dark')
  }

  save (value) {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(value)

    if (value === 'dark') {
      this.sunTarget.classList.remove('hidden')
      this.moonTarget.classList.add('hidden')
    } else {
      this.moonTarget.classList.remove('hidden')
      this.sunTarget.classList.add('hidden')
    }

    return localStorage.setItem('view-mode', value)
  }

  get mode () {
    return localStorage.getItem('view-mode')
  }

  get defaultMode () {
    let mode = 'light'
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) mode = 'dark'
    return mode
  }
}
