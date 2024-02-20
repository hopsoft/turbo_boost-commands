//import headers from './headers'
//import lifecycle from './lifecycle'
//import renderer from './renderer'
//import state from './state'
//import urls from './urls'
//import { dispatch } from './events'
//
const frameSources = {}
//
//const appendHeaders = headers => {}

// fires before making a turbo HTTP request
//addEventListener('turbo:before-fetch-request', event => {
//  const frame = event.target.closest('turbo-frame')
//  if (!frame?.activeTurboBoostCommand) return
//
//  event.preventDefault()
//  const { fetchOptions } = event.detail
//  fetchOptions.headers = headers.prepare(fetchOptions.headers)
//  event.detail.url
//
//  debugger
//})
//
//// fires after receiving a turbo HTTP response
//addEventListener('turbo:before-fetch-response', event => {
//  const frame = event.target.closest('turbo-frame')
//  const { fetchResponse: response } = event.detail
//
//  if (frame) frameSources[frame.id] = frame.src
//
//  if (response.header('TurboBoost')) {
//    if (response.statusCode < 200 || response.statusCode > 399) {
//      const error = `Server returned a ${response.statusCode} status code! TurboBoost Commands require 2XX-3XX status codes.`
//      dispatch(lifecycle.events.clientError, document, { detail: { ...event.detail, error } }, true)
//    }
//
//    if (response.header('TurboBoost') === 'Append') {
//      event.preventDefault()
//      response.responseText.then(content => renderer.append(content))
//    }
//  }
//})
//

// fires when a frame element is navigated and finishes loading
addEventListener('turbo:frame-load', event => {
  const frame = event.target.closest('turbo-frame')
  frame.dataset.src = frameSources[frame.id] || frame.src || frame.dataset.src
  delete frameSources[frame.id]
})
