import { dispatch, stateEvents as events } from '../events'

let state

// TODO: make recursive
function stateValue (key) {
  const value = state[key]
  if (Array.isArray(value)) return [...value]
  if (typeof value === 'object') return { ...value }
  return value
}

function notify (key, changes = {}) {
  dispatch(events.stateChange, document, { [key]: changes })
  return true
}

function observable (object, stateKey) {
  if (!object) return object

  const proxy = new Proxy(object, {
    deleteProperty (target, key) {
      const from = stateValue(stateKey || key)
      delete target[key]
      const to = stateValue(stateKey || key)
      this.changed = true
      return notify(stateKey || key, { from, to })
    },

    set (target, key, value, receiver) {
      if (Array.isArray(value) || typeof value === 'object')
        value = observable(value, stateKey || key)

      const from = stateValue(stateKey || key)
      target[key] = value
      const to = stateValue(stateKey || key)
      this.changed = true
      return notify(stateKey || key, { from, to })
    }
  })

  state = state || proxy
  return proxy
}

export default observable
