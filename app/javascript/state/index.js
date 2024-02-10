import meta from '../meta'
import observable from './observable'
import { dispatch, commandEvents, stateEvents } from '../events'

let initialState, currentState, changedState
let loadStateTimeout

function loadState() {
  if (!meta.element) return loadStateLater()
  const json = JSON.parse(meta.element.dataset.client)
  initialState = { ...json }
  currentState = observable(json)
  changedState = {}
  setTimeout(() =>
    dispatch(stateEvents.stateLoad, meta.element, {
      detail: { state: currentState }
    })
  )
}

function loadStateLater() {
  clearTimeout(loadStateTimeout)
  loadStateTimeout = setTimeout(loadState, 10)
}

if (!initialState) loadState()

addEventListener('DOMContentLoaded', loadStateLater)
addEventListener('load', loadStateLater)
addEventListener('turbo:load', loadStateLater)
addEventListener('turbo:frame-load', loadStateLater)
addEventListener(commandEvents.success, loadStateLater)

addEventListener(stateEvents.stateChange, event => {
  changedState = {}
  for (const [key, value] of Object.entries(currentState))
    if (initialState[key] !== value) changedState[key] = value
  meta.client = currentState
  meta.delta = changedState
})

export default {
  events: stateEvents,

  get current() {
    return currentState
  },

  get delta() {
    return changedState
  }
}
