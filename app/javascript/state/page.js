import schema from '../schema.js'

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
      const stateAttributes = attributes.reduce((acc, name) => {
        if (element.hasAttribute(name)) acc[name] = element.getAttribute(name) || name
        return acc
      }, {})
      if (Object.values(stateAttributes).length) memo[element.id] = stateAttributes
    }
    return memo
  }, {})
}

const restoreState = (state = {}) => {
  for (const [id, attributes] of Object.entries(state)) {
    for (const [attribute, value] of Object.entries(attributes)) updateElement(id, attribute, value)
  }
}

export default {
  buildState,
  restoreState
}
