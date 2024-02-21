import headers from './headers'
import lifecycle from './lifecycle'
import { dispatch } from './events'
import { render } from './renderer'

const frameSources = {}

// fires after receiving a turbo HTTP response
addEventListener('turbo:before-fetch-response', event => {
  const frame = event.target.closest('turbo-frame')
  if (frame?.id && frame?.src) frameSources[frame.id] = frame.src

  const { fetchResponse: response } = event.detail
  const header = response.header(headers.RESPONSE_HEADER)

  if (!header) return

  // We'll take it from here Hotwire...
  event.preventDefault()
  const { statusCode } = response
  const { strategy } = headers.tokenize(header)

  // FAIL: Status outside the range of 200-399
  if (statusCode < 200 || statusCode > 399) {
    const error = `Server returned a ${status} status code! TurboBoost Commands require 2XX-3XX status codes.`
    dispatch(lifecycle.events.clientError, document, { detail: { error, response } }, true)
  }

  response.responseHTML.then(content => render(strategy, content))
})

// fires when a frame element is navigated and finishes loading
addEventListener('turbo:frame-load', event => {
  const frame = event.target.closest('turbo-frame')
  frame.dataset.src = frameSources[frame.id] || frame.src || frame.dataset.src
  delete frameSources[frame.id]
})
