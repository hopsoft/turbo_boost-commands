import meta from '../meta'
import { dispatch, stateEvents as events } from '../events'

let head

function notify (state) {
  dispatch(events.stateChange, meta.element, { state })
  return true
}

function observable (object, parent = null) {
  if (!object || typeof object !== 'object') return object

  const proxy = new Proxy(object, {
    deleteProperty (target, key) {
      delete target[key]
      return notify(head)
    },

    set (target, key, value, receiver) {
      target[key] = observable(value, this)
      return notify(head)
    }
  })

  if (Array.isArray(object)) {
    object.forEach((value, index) => (object[index] = observable(value, proxy)))
  } else if (typeof object === 'object') {
    for (const [key, value] of Object.entries(object))
      object[key] = observable(value, proxy)
  }

  if (!parent) head = proxy
  return proxy
}

export default observable
