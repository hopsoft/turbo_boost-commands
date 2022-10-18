import meta from './meta'
import renderer from './renderer'
import lifecycle from './lifecycle'

const frameSources = {}

// fires before making a turbo HTTP request
addEventListener('turbo:before-fetch-request', event => {
  const frame = event.target.closest('turbo-frame')
  const { fetchOptions } = event.detail
  if (meta.busy) {
    let acceptHeaders = [
      'text/vnd.turbo-reflex.html',
      fetchOptions.headers['Accept']
    ]
    acceptHeaders = acceptHeaders
      .filter(entry => entry && entry.trim().length > 0)
      .join(', ')
    fetchOptions.headers['Accept'] = acceptHeaders
  }
  fetchOptions.headers['TurboReflex-Token'] = meta.token
  meta.uiStateBase64Chunks.forEach(
    (chunk, i) =>
      (fetchOptions.headers[
        `TurboReflex-UiState-${i.toString().padStart(6, '0')}`
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
      lifecycle.dispatchClientError({ ...event.detail, error })
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
