import './frame_sources'
import Security from './security'
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
  isRegisteredEvent
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
  const element = findClosestReflex(event.target)
  if (!element) return

  if (!isRegisteredEvent(event.type, element.tagName)) return

  const frameId = findFrameId(element)
  if (!frameId) return

  const frame = findFrame(frameId)
  if (!frame) return

  const frameSrc = findFrameSrc(frame)
  if (!frameSrc) return

  const reflexPayload = {
    frameId: frameId,
    element: buildAttributePayload(element)
  }

  frame.dataset.turboReflexActive = true

  if (element.tagName.toLowerCase() === 'form') {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = 'turbo_reflex'
    input.value = JSON.stringify(reflexPayload)
    element.appendChild(input)
  } else {
    event.preventDefault()
    event.stopPropagation()
    const frameURL = buildURL(frameSrc)
    frameURL.searchParams.set('turbo_reflex', JSON.stringify(reflexPayload))
    frame.src = frameURL.toString()
  }
}

// wire things up and setup default events
registerEventListener(invokeReflex)
registerEvent('change', ['input', 'select', 'textarea'])
registerEvent('submit', ['form'])
registerEvent('click', ['*'])

export default { registeredEvents, registerEvent }
