import schema from '../schema.js'
import { dispatch, commandEvents, stateEvents } from '../events.js'

// MutationObserver to track mutations for page state...........................
function callback(mutations, _observer) {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes') {
      if (mutation.target.hasAttribute(schema.pageStateAttribute)) {
        const value = mutation.target.getAttribute(schema.pageStateAttribute)
        const attributes = JSON.parse(value)
        if (attributes.includes(mutation.attributeName))
          dispatch(stateEvents.pageChange, mutation.target, { detail: mutation })
      }
    }
  })
}

new MutationObserver(callback).observe(document.documentElement, {
  attributeOldValue: false,
  attributes: true,
  childList: true,
  subtree: true
})

function restoreState(state = {}) {
  for (const [id, attributes] of Object.entries(state)) {
    for (const [name, value] of Object.entries(attributes))
      document.getElementById(id)?.setAttribute(name, value)
  }
}

function buildState() {
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

export default { buildState, restoreState }
