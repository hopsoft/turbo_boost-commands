import schema from '../schema.js'
import { dispatch, commandEvents, stateEvents } from '../events.js'

let restoring = false
let timeout

const buildState = () => {
  const elements = Array.from(document.querySelectorAll(`[id][${schema.pageStateAttribute}]`))
  return elements.reduce((memo, element) => {
    try {
      const id = element.id.trim()
      const attributes = JSON.parse(element.getAttribute(schema.pageStateAttribute))

      if (id.length === 0 || attributes.length === 0) return memo

      memo[id] = attributes.reduce((acc, name) => {
        if (element.hasAttribute(name)) acc[name] = element.getAttribute(name) || name
        return acc
      }, {})
    } catch (e) {
      const message = `
        The element with id ${key} has an invalid value assigned to: ${schema.optimisticPageStateAttribute}
        To participate in 'optimistic page state', elements must have a value that is a valid JSON string
        with an array of safe attribute names to observe.`
      dispatch(commandEvents.clientError, element, { detail: { message } })
    }

    return memo
  }, {})
}

const restoreState = (state = {}) => {
  if (restoring) return
  restoring = true

  console.log('restoreState', state)

  try {
    for (const [id, attributes] of Object.entries(state)) {
      for (const [name, value] of Object.entries(attributes)) {
        document.getElementById(id)?.setAttribute(name, value)
      }
    }
  } finally {
    restoring = false
  }
}

export default {
  buildState,
  restoreState,
  get restoring() {
    return restoring
  }
}
