import meta from './meta'
import state from './state'
import renderer from './renderer'
import { dispatch } from './events'
import lifecycle from './lifecycle'

const frameSources = {}

// fires before making a turbo HTTP request
addEventListener('turbo:before-fetch-request', event => {
  const frame = event.target.closest('turbo-frame')
  const { fetchOptions } = event.detail

  // command invoked and busy
  if (meta.busy) {
    let acceptHeaders = [
      'text/vnd.turbo-boost.html',
      fetchOptions.headers['Accept']
    ]
    acceptHeaders = acceptHeaders
      .filter(entry => entry && entry.trim().length > 0)
      .join(', ')
    fetchOptions.headers['Accept'] = acceptHeaders
    fetchOptions.headers['TurboBoost-Token'] = meta.token
  }

  // always send state
  state.payloadChunks.forEach((chunk, i) => {
    fetchOptions.headers[
      `TurboBoost-State-${i.toString().padStart(4, '0')}`
    ] = chunk
  })
})

// fires after receiving a turbo HTTP response
addEventListener('turbo:before-fetch-response', event => {
  const frame = event.target.closest('turbo-frame')
  const { fetchResponse: response } = event.detail

  if (frame) frameSources[frame.id] = frame.src

  if (response.header('TurboBoost')) {
    if (response.statusCode < 200 || response.statusCode > 399) {
      const error = `Server returned a ${response.statusCode} status code! TurboBoost Commands require 2XX-3XX status codes.`
      dispatch(
        lifecycle.events.clientError,
        document,
        { detail: { ...event.detail, error } },
        true
      )
    }

    if (response.header('TurboBoost') === 'Append') {
      event.preventDefault()
      response.responseText.then(content => renderer.append(content))
    }
  }
})

// fires when a frame element is navigated and finishes loading
addEventListener('turbo:frame-load', event => {
  const frame = event.target.closest('turbo-frame')
  frame.dataset.turboBoostSrc =
    frameSources[frame.id] || frame.src || frame.dataset.turboBoostSrc
  delete frameSources[frame.id]
})
