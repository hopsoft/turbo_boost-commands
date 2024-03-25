// TODO: Move State to its own library
import observable from './observable'
import page from './page'
import storage from './storage'
import { dispatch, stateEvents, turboEvents } from '../events'

const key = 'TurboBoost::State'
const stub = { page: {}, signed: null, unsigned: {} }

// variables that hold the state
let signed = null // string
let unsigned = {} // object
let restored = null // null, object during state restoration

// timeout used to debounce finalizing state restoration
let finalizeRestoreTimeout

const finalizeRestore = () => {
  clearTimeout(finalizeRestoreTimeout)
  finalizeRestoreTimeout = setTimeout(() => (restored = null), 1000)
}

const initiateRestore = () => {
  clearTimeout(finalizeRestoreTimeout)
  restored = restored || { ...stub, ...storage.find(key) }
  page.restoreState(restored.page)
  finalizeRestore()
}

const initiateRestoreTriggers = [turboEvents.frameLoad, turboEvents.load, 'DOMContentLoaded']
initiateRestoreTriggers.forEach(name => addEventListener(name, initiateRestore))

const save = () => {
  if (restored) return // restored state is present, do not save

  const saved = { ...stub, ...storage.find(key) }
  const fresh = {
    signed: signed || saved.signed,
    unsigned: { ...saved.unsigned, ...unsigned },
    page: { ...saved.page, ...page.buildState() }
  }

  storage.save(key, fresh)
}

const initialize = json => {
  const state = JSON.parse(json)
  signed = state.signed
  unsigned = observable(state.unsigned || {})
  save()
  setTimeout(() => dispatch(stateEvents.stateInitialize, document, { detail: unsigned }))
}

// saves state after DOM mutations
new MutationObserver(save).observe(document, {
  attributes: true,
  childList: true,
  subtree: true
})

export default {
  initialize,
  buildPageState: page.buildState,
  get signed() {
    return signed
  },
  get unsigned() {
    return unsigned
  }
}
