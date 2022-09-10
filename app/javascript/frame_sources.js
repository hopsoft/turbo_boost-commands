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

// fires when a frame element is navigated
addEventListener('turbo:frame-load', event => {
  const frame = event.target
  frame.dataset.turboReflexSrc =
    frameSources[frame.id] || frame.src || frame.dataset.turboReflexSrc
  delete frameSources[frame.id]
})

// fires before a stream response is rendered
addEventListener('turbo:before-stream-render', event => {
  const stream = event.target
  const frame = stream.templateContent.querySelector('turbo-frame')
  if (!frame) return
  const frameId = frame.id
  setTimeout(() => {
    const f = document.getElementById(frameId)
    f.dataset.turboReflexSrc =
      frameSources[frame.id] || f.src || f.dataset.turboReflexSrc
    delete frameSources[frameId]
  }, 100)
})
