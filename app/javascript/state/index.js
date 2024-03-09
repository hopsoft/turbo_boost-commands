// TODO: Move State to its own library
import schema from '../schema'
import observable from './observable'
import storage from './storage'
import { dispatch, commandEvents, stateEvents } from '../events'

let entries = {}
let observers = {}

function observe(key, state) {
  removeEventListener(stateEvents.stateChange, observers[key])
  observers[key] = addEventListener(stateEvents.stateChange, event => {
    for (const [key, value] of Object.entries(state.current)) {
      if (state.initial[key] !== value) state.optimistic[key] = value
    }
    storage.save(key, state)
  })
}

function buildState(value = {}) {
  const stub = {
    key: null,
    initial: {},
    current: {},
    optimistic: {},
    signed: null
  }
  const state = { ...stub, ...value }
  const { key } = state
  if (key) {
    state.current = observable({ ...state.initial })
    observe(key, state)
    entries[key] = state
    storage.save(key, state)
  }
  return state
}

function initialize(key, initial, signed) {
  const state = buildState({ key, initial: JSON.parse(initial), signed })
  setTimeout(() => dispatch(stateEvents.stateInitialize, document, { detail: state }))
  return state
}

function find(key) {
  return buildState({ key, ...storage.find(key) })
}

// NOTE: We use State to manage the element cache
function buildElementCache() {
  const elementCacheKey = 'TurboBoost::Commands::ElementCache'
  const cache = find(elementCacheKey)
  document.querySelectorAll(`[${schema.elementCacheAttribute}]`).forEach(element => {
    const key = element.getAttribute('id')
    if (key) {
      try {
        const attributeNames = JSON.parse(element.getAttribute(schema.elementCacheAttribute))
        const value = attributeNames.reduce((memo, name) => {
          if (element.hasAttribute(name)) memo[name] = element.getAttribute(name) || element[name]
          return memo
        }, {})
        if (Object.entries(value).length > 0) cache.current[key] = value
      } catch (e) {
        const message = `Elements configured for TurboBoost caching must have a valid JSON string as the value of the ${schema.elementCacheAttribute} attribute!`
        dispatch(commandEvents.clientError, element, { detail: { message } })
      }
    } else {
      const message = 'Elements configured for TurboBoost caching must have an id attribute!'
      dispatch(commandEvents.clientError, element, { detail: { message } })
    }
  })
  storage.save(elementCacheKey, cache)
  return cache
}

export default {
  initialize,
  buildElementCache,
  entries,
  find
}
