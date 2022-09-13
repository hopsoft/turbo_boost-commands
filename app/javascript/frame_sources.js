import LifecycleEvents from './lifecycle_events'
const frameSources = {}

// fires after receiving a turbo HTTP response
addEventListener('turbo:before-fetch-response', event => {
  const frame = event.target
  frameSources[frame.id] = frame.src

  const { turboReflexActive, turboReflexElementId } = frame.dataset
  if (!turboReflexActive) return

  const element = document.getElementById(turboReflexElementId)
  delete frame.dataset.turboReflexActive
  delete frame.dataset.turboReflexElementId

  LifecycleEvents.dispatch(LifecycleEvents.finish, element || document, {
    frame,
    element: element || 'Unknown! Missing id attribute.'
  })
})

// fires when a frame element is navigated and finishes loading
addEventListener('turbo:frame-load', event => {
  const frame = event.target
  frame.dataset.turboReflexSrc =
    frameSources[frame.id] || frame.src || frame.dataset.turboReflexSrc
  delete frameSources[frame.id]
})
