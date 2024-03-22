// TODO: Move State to its own library
import observable from './observable'
import page from './page'
import storage from './storage'
import { dispatch, stateEvents, turboEvents } from '../events'

const storageKey = 'TurboBoost::State'
const stub = { pageState: {}, signedState: null, unsignedState: {} }

let signedState = null // string
let unsignedState = {}
let pageStateRestoreListeners
let pageStateChangeListeners
let stateChangeListeners

const findState = () => ({ ...stub, ...storage.find(storageKey) })

const saveState = () => {
  const storedState = findState()

  const payload = {
    pageState: { ...storedState.pageState, ...page.buildState() },
    signedState: { ...storedState.signedState, ...signedState },
    unsignedState: { ...storedState.unsignedState, ...unsignedState }
  }

  storage.save(storageKey, payload)
}

function registerListeners() {
  if (!pageStateRestoreListeners) {
    const { pageState, signedState: signed, unsignedState: unsigned } = findState()
    const handler = () => {
      signedState = signed
      unsignedState = observable(unsigned || {})
      page.restoreState(pageState)
    }
    pageStateRestoreListeners = [
      addEventListener('DOMContentLoaded', handler),
      addEventListener(turboEvents.load, handler),
      addEventListener(turboEvents.frameLoad, handler)
    ]
  }

  if (!pageStateChangeListeners)
    pageStateChangeListeners = [addEventListener(stateEvents.pageChange, saveState)]

  if (!stateChangeListeners) stateChangeListeners = [addEventListener(stateEvents.stateChange, saveState)]
}

function initialize(json) {
  const payload = JSON.parse(json)
  const { signed, unsigned } = payload
  signedState = signed
  unsignedState = observable(unsigned || {})
  saveState()
  setTimeout(() => dispatch(stateEvents.stateInitialize, document, { detail: unsigned }))
}

registerListeners()

export default {
  initialize,
  buildPageState: page.buildState,
  get signed() {
    return signedState
  },
  get unsigned() {
    return unsignedState
  }
}
