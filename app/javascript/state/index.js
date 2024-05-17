// TODO: Move State to its own library
import observable from './observable'
import page from './page'
import storage from './storage'
import { dispatch, stateEvents } from '../events'

const key = 'TurboBoost::State'
const stub = { page: {}, signed: null, unsigned: {} }

let signed = null // signed state <string>
let unsigned = {} // unsigned state (optimistic) <object>

const restore = () => {
  const saved = { ...stub, ...storage.find(key) }
  const path = window.location.pathname
  saved.page[path] = saved.page[path] || {}
  page.restoreState(saved.page[path])
}

const save = () => {
  const saved = { ...stub, ...storage.find(key) }
  const fresh = {
    signed: signed || saved.signed,
    unsigned: { ...saved.unsigned, ...unsigned },
    page: { ...saved.page }
  }

  const path = window.location.pathname
  fresh.page[path] = { ...fresh.page[path], ...page.buildState() }
  storage.save(key, fresh)
}

const initialize = json => {
  const state = JSON.parse(json)
  signed = state.signed
  unsigned = observable(state.unsigned || {})
  save()
  dispatch(stateEvents.stateInitialize, document, { detail: unsigned })
}

// setup
addEventListener('DOMContentLoaded', restore)
addEventListener('turbo:morph', restore)
addEventListener('turbo:render', restore)
addEventListener('turbo:before-fetch-request', save)
window.addEventListener('beforeunload', save)

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
