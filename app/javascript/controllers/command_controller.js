import schema from '../schema'
import delegates from '../delegates'
import { dispatch } from '../events'

export default function createCommandController(BaseController) {
  return class extends BaseController {
    static values = {
      name: String, // the name of the command to invoke
      form: String // an optional dom id of a form element to submit
    }

    invoke(event) {
      event.preventDefault()

      const element = this.formElement || this.element
      this.assignCommand(element)

      const eventDelegate = delegates.getRegisteredEventForElement(element)
      element.addEventListener(eventDelegate.name, this.reset, { once: true })

      if (eventDelegate.name === 'submit' && element.requestSubmit) return element.requestSubmit()

      dispatch(registeredEvent.name, this.element, { detail: { sourceEvent } })
    }

    assignCommand(el) {
      const originalCommand = el.getAttribute(schema.commandAttribute)
      el.setAttribute(schema.commandAttribute, this.nameValue)
      el.setAttribute(`${schema.commandAttribute}-original`, originalCommand)
    }

    reset(event) {
      const el = event.target
      setTimeout(() => {
        el.setAttribute(schema.commandAttribute, el.getAttribute(`${schema.commandAttribute}-original`))
        el.removeAttribute(`${schema.commandAttribute}-original`)
      })
    }

    get formElement() {
      return document.getElementById(this.formValue)
    }
  }
}
