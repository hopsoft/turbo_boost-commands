import { dispatch, stateEvents as events } from '../events'

function deleteHandler (property, options = { from: null, to: null }) {
  dispatch(events.stateChange, document, { property, ...options })
}

function setHandler (property, options = { from: null, to: null }) {
  dispatch(events.stateChange, document, { property, ...options })
}

function observable (
  object,
  options = { delete: deleteHandler, set: setHandler }
) {
  return new Proxy(object, {
    deleteProperty (target, property) {
      const from = target[property]
      const to = null
      delete target[property]
      options.delete.call(this, property, { from, to })
      return true
    },

    set (target, property, value, receiver) {
      const from = target[property]
      const to = value

      if (Array.isArray(value) || typeof value === 'object')
        value = new Proxy(value, options)

      target[property] = value
      options.set.call(this, property, { from, to })
      return true
    }
  })
}

export default observable
