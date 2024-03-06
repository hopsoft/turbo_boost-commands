// TODO: Move State to its own library
import schema from '../schema'
import observable from './observable'
import storage from './storage'
import { dispatch, commandEvents, stateEvents } from '../events'

let entries = {}
let observers = {}

function observe(name, state) {
  removeEventListener(stateEvents.stateChange, observers[name])
  observers[name] = addEventListener(stateEvents.stateChange, event => {
    for (const [key, value] of Object.entries(state.current)) {
      if (state.initial[key] !== value) state.changed[key] = value
    }
    storage.save(name, state)
  })
}

function initialize(name, initial, signed) {
  const json = JSON.parse(initial)
  const state = {
    name,
    signed,
    initial: { ...json },
    current: observable({ ...json }),
    changed: {}
  }

  entries[name] = state
  storage.save(name, state)
  observe(name, state)
  setTimeout(() => dispatch(stateEvents.stateLoad, document, { detail: state }))
}

function find(name) {
  const stub = { name, initial: {}, current: {}, changed: {} }
  const stored = storage.find(name)
  return { ...stub, ...stored }
}

function collect(element) {
  const selector = `[${schema.commandAttribute}]`
  const list = []
  let context = element.closest(selector)
  while (context) {
    const state = find(context.getAttribute(schema.commandAttribute))
    list.push(state)
    context = context.parentElement.closest(selector)
  }
  return list
}

export default {
  initialize,
  collect,
  entries,
  find
}
