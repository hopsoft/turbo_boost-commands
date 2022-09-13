import './frame_sources'
import Security from './security'
import LifecycleEvents from './lifecycle_events'
import {
  findClosestReflex,
  findClosestFrame,
  findFrameId,
  findFrame,
  findFrameSrc,
  buildAttributePayload
} from './elements'
import {
  registerEventListener,
  registerEvent,
  registeredEvents,
  isRegisteredEvent,
  logRegisteredEvents
} from './event_registry'

// fires before making a turbo HTTP request
addEventListener('turbo:before-fetch-request', event => {
  const frame = event.target
  const { turboReflexActive } = frame.dataset
  if (!turboReflexActive) return
  const { fetchOptions } = event.detail
  fetchOptions.headers['Turbo-Reflex'] = Security.token
})

function buildURL (urlString) {
  const a = document.createElement('a')
  a.href = urlString
  return new URL(a)
}

function invokeReflex (event) {
  let element, frameId, frame, frameSrc
  try {
    element = findClosestReflex(event.target)
    if (!element) return

    if (!isRegisteredEvent(event.type, element.tagName)) return

    LifecycleEvents.dispatch(LifecycleEvents.beforeStart, element, { element })

    frameId = findFrameId(element)
    if (!frameId) return

    frame = findFrame(frameId)
    if (!frame) return

    frameSrc = findFrameSrc(frame)
    if (!frameSrc) return

    const payload = {
      frameId: frameId,
      element: buildAttributePayload(element)
    }

    LifecycleEvents.dispatch(LifecycleEvents.start, element, {
      element,
      frameId,
      frame,
      frameSrc,
      payload
    })
    frame.dataset.turboReflexActive = true
    frame.dataset.turboReflexElementId = element.id

    if (element.tagName.toLowerCase() === 'form') {
      payload.token = Security.token
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'turbo_reflex'
      input.value = JSON.stringify(payload)
      element.appendChild(input)
    } else {
      event.preventDefault()
      const frameURL = buildURL(frameSrc)
      frameURL.searchParams.set('turbo_reflex', JSON.stringify(payload))
      frame.src = frameURL.toString()
    }
  } catch (error) {
    console.error(
      `TurboReflex encountered an unexpected error!`,
      { element, frameId, frame, frameSrc, target: event.target },
      error
    )
    LifecycleEvents.dispatch(LifecycleEvents.error, element || document, {
      element,
      frameId,
      frame,
      frameSrc,
      error
    })
  }
}

// wire things up and setup default events
registerEventListener(invokeReflex)
registerEvent('change', ['input', 'select', 'textarea'])
registerEvent('submit', ['form'])
registerEvent('click', ['*'])

export default {
  registerEvent,
  logRegisteredEvents,
  logLifecycleEventNames: LifecycleEvents.logEventNames
}
