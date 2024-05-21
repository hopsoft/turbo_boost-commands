import headers from './headers'
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
  const { strategy } = headers.tokenize(header)
  response.responseHTML.then(content => render(strategy, content))
})

// fires when a frame element is navigated and finishes loading
addEventListener('turbo:frame-load', event => {
  const frame = event.target.closest('turbo-frame')
  frame.dataset.src = frameSources[frame.id] || frame.src || frame.dataset.src
  delete frameSources[frame.id]
})
