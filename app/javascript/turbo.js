import elements from './elements'
import renderer from './renderer'
import lifecycle from './lifecycle'

const frameSources = {}

// fires before making a turbo HTTP request
addEventListener('turbo:before-fetch-request', event => {
  const frame = event.target.closest('turbo-frame')
  const { fetchOptions } = event.detail
  fetchOptions.headers['TurboReflex-Token'] = elements.metaElementToken
})

// fires after receiving a turbo HTTP response
addEventListener('turbo:before-fetch-response', event => {
  const frame = event.target.closest('turbo-frame')
  const { fetchResponse: response } = event.detail

  if (frame) {
    frameSources[frame.id] = frame.src

    if (response.header('TurboReflex') === 'true') {
      if (response.statusCode < 200 || response.statusCode > 299) {
        const error = `Server returned a ${response.statusCode} status code! TurboReflex requires 2XX status codes.`
        lifecycle.dispatchClientError({ ...event.detail, error })
      }

      if (response.header('TurboReflex-Hijacked') === 'true') {
        event.preventDefault()
        response.responseText.then(content => renderer.renderStreams(content))
      }
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
