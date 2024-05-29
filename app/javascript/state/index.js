// TODO: Move State to its own library
import observable from './observable'
import page from './page'
import storage from './storage'
import { dispatch, stateEvents } from '../events'

const key = 'TurboBoost::State'
const stub = { pages: {}, signed: null, unsigned: {} }

let signed = null // signed state <string>
let unsigned = {} // unsigned state (optimistic) <object>

const restore = () => {
  const saved = { ...stub, ...storage.find(key) }
  signed = saved.signed
  unsigned = observable(saved.unsigned)
  saved.pages[location.pathname] = saved.pages[location.pathname] || {}
  page.restoreState(saved.pages[location.pathname])
}

const save = () => {
  const saved = { ...stub, ...storage.find(key) }
  const fresh = {
    signed: signed || saved.signed,
    unsigned: { ...saved.unsigned, ...unsigned },
    pages: { ...saved.pages }
  }

  // update the current page's state entry
  const pageKey = location.pathname
  const pageState = page.buildState()
  Object.values(pageState).length ? (fresh.pages[pageKey] = pageState) : delete fresh.pages[pageKey]

  storage.save(key, fresh)
}

const initialize = json => {
  const state = { ...stub, ...JSON.parse(json) }
  signed = state.signed
  unsigned = observable(state.unsigned)
  save()
  dispatch(stateEvents.stateInitialize, document, { detail: unsigned })
}

// setup
addEventListener('DOMContentLoaded', restore)
addEventListener('turbo:morph', restore)
addEventListener('turbo:render', restore)
addEventListener('turbo:before-fetch-request', save)
addEventListener('beforeunload', save)

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
