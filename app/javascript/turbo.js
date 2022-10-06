import elements from './elements'
import renderer from './renderer'
import lifecycle from './lifecycle'

const frameSources = {}

// turbo:submit-start - fires during a form submission
// turbo:submit-end - fires after the form submission-initiated network request completes
// turbo:fetch-request-error - fires when a form or frame fetch request fails due to network errors

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

    if (response.header('TurboReflex')) {
      if (response.statusCode < 200 || response.statusCode > 299) {
        const error = `Server returned a ${response.statusCode} status code! TurboReflex requires 2XX status codes.`
        lifecycle.dispatchClientError({ ...event.detail, error })
      }

      if (response.header('TurboReflex') === 'Override') {
        event.preventDefault()
        response.responseText.then(content => renderer.append(content))
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
