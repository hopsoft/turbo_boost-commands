import schema from '../schema.js'
import { dispatch, commandEvents, stateEvents } from '../events.js'

let timeout

const updateElement = (id, attribute, value, attempts = 1) => {
  if (attempts > 20) return
  const element = document.getElementById(id)
  if (element?.isConnected) return element.setAttribute(attribute, value)
  setTimeout(() => updateElement(id, attribute, value, attempts + 1), attempts * 5)
}

const buildState = () => {
  const elements = Array.from(document.querySelectorAll(`[id][${schema.stateAttributesAttribute}]`))
  return elements.reduce((memo, element) => {
    const attributes = JSON.parse(element.getAttribute(schema.stateAttributesAttribute))
    if (element.id) {
      memo[element.id] = attributes.reduce((acc, name) => {
        if (element.hasAttribute(name)) acc[name] = element.getAttribute(name) || name
        return acc
      }, {})
    }
    return memo
  }, {})
}

const restoreState = (state = {}) => {
  console.log('restoreState', state)
  for (const [id, attributes] of Object.entries(state)) {
    for (const [attribute, value] of Object.entries(attributes)) updateElement(id, attribute, value)
  }
}

export default {
  buildState,
  restoreState
}
