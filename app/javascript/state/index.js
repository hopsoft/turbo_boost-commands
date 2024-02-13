// TODO: Consider moving State to its own library
import observable from './observable'
import { dispatch, commandEvents, stateEvents } from '../events'

let initialState, currentState, changedState, signedState

function initialize(initial, signed) {
  const json = JSON.parse(initial)
  initialState = { ...json }
  signedState = signed
  currentState = observable(json)
  changedState = {}
  setTimeout(() =>
    dispatch(stateEvents.stateLoad, document, {
      detail: { state: currentState }
    })
  )
}

addEventListener(stateEvents.stateChange, event => {
  for (const [key, value] of Object.entries(currentState))
    if (initialState[key] !== value) changedState[key] = value
})

export default {
  initialize,
  events: stateEvents,

  get initial() {
    return initialState
  },

  get current() {
    return currentState
  },

  get changed() {
    return changedState
  },

  get signed() {
    return signedState
  }
}
