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

  // reflex invoked and busy
  if (meta.busy) {
    let acceptHeaders = [
      'text/vnd.turbo-reflex.html',
      fetchOptions.headers['Accept']
    ]
    acceptHeaders = acceptHeaders
      .filter(entry => entry && entry.trim().length > 0)
      .join(', ')
    fetchOptions.headers['Accept'] = acceptHeaders
    fetchOptions.headers['TurboReflex-Token'] = meta.token
  }

  // always send state
  state.payloadChunks.forEach(
    (chunk, i) =>
      (fetchOptions.headers[
        `TurboReflex-State-${i.toString().padStart(4, '0')}`
      ] = chunk)
  )
})

// fires after receiving a turbo HTTP response
addEventListener('turbo:before-fetch-response', event => {
  const frame = event.target.closest('turbo-frame')
  const { fetchResponse: response } = event.detail

  if (frame) frameSources[frame.id] = frame.src

  if (response.header('TurboReflex')) {
    if (response.statusCode < 200 || response.statusCode > 399) {
      const error = `Server returned a ${response.statusCode} status code! TurboReflex requires 2XX-3XX status codes.`
      dispatch(
        lifecycle.events.clientError,
        document,
        { ...event.detail, error },
        true
      )
    }

    if (response.header('TurboReflex') === 'Append') {
      event.preventDefault()
      response.responseText.then(content => renderer.append(content))
    }
  }
})

// fires when a frame element is navigated and finishes loading
addEventListener('turbo:frame-load', event => {
  const frame = event.target.closest('turbo-frame')
  frame.dataset.turboReflexSrc =
    frameSources[frame.id] || frame.src || frame.dataset.turboReflexSrc
  delete frameSources[frame.id]
})
