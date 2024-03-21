// TODO: Move State to its own library
import observable from './observable'
import page from './page'
import storage from './storage'
import { dispatch, stateEvents } from '../events'

const storageKey = 'TurboBoost::State'

let signedState = null // string
let unsignedState = {}
let pageStateRestoreListener
let pageStateChangeListener

if (!pageStateRestoreListener) {
  //const storedPageState = storage.find(storageKey)['pageState']
  const storedPageState = {}
  pageStateRestoreListener = addEventListener('DOMContentLoaded', () => {
    page.restoreState(storedPageState)
  })
}

if (!pageStateChangeListener) pageStateChangeListener = addEventListener(stateEvents.pageChange, saveState)

const saveState = () => {
  const payload = {
    pageState: page.buildState(),
    signedState,
    ...unsignedState
  }

  console.log('saveState', stateEvents, payload)
  storage.save(storageKey, payload)
}

function initialize(json) {
  removeEventListener(stateEvents.stateChange, saveState)
  const payload = JSON.parse(json)
  const { signed, unsigned } = payload

  signedState = signed
  unsignedState = observable(unsigned || {})

  addEventListener(stateEvents.stateChange, saveState)
  saveState()

  setTimeout(() => dispatch(stateEvents.stateInitialize, document, { detail: unsigned }))
}

//function find(key) {
//return buildState({ key, ...storage.find(key) })
//}

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
