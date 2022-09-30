import elements from './elements'
import lifecycle from './lifecycle'

const frameSources = {}

// fires before making a turbo HTTP request
addEventListener('turbo:before-fetch-request', event => {
  const frame = event.target.closest('turbo-frame')

  const detail = elements.metaElement.detail || {}
  if (frame != detail.frame) return

  const { fetchOptions } = event.detail
  fetchOptions.headers['TurboReflex-Token'] = elements.metaElementToken
})

// fires after receiving a turbo HTTP response
addEventListener('turbo:before-fetch-response', event => {
  const frame = event.target.closest('turbo-frame')
  if (frame) frameSources[frame.id] = frame.src

  const detail = elements.metaElement.detail || {}
  if (frame != detail.frame) return

  delete elements.metaElement.dataset.busy
  delete elements.metaElement.detail
  lifecycle.dispatch(
    lifecycle.events.finish,
    detail.element || document,
    detail
  )
})

// fires when a frame element is navigated and finishes loading
addEventListener('turbo:frame-load', event => {
  const frame = event.target.closest('turbo-frame')
  frame.dataset.turboReflexSrc =
    frameSources[frame.id] || frame.src || frame.dataset.turboReflexSrc
  delete frameSources[frame.id]
})
