import './turbo'
import lifecycle from './lifecycle'
import { build as buildURL } from './urls'
import { default as invokeWindowReflex } from './drivers/window'
import {
  buildAttributePayload,
  findClosestReflex,
  findClosestFrame,
  findFrameId,
  findFrame,
  findFrameSrc,
  meta
} from './elements'
import {
  registerEventListener,
  registerEvent,
  registeredEvents,
  isRegisteredEvent,
  logRegisteredEvents
} from './event_registry'

function invokeFrameReflex (frame, payload) {
  const src = findFrameSrc(frame)
  if (!src) return
  const url = buildURL(src)
  url.searchParams.set('turbo_reflex', JSON.stringify(payload))
  frame.src = url.toString()
}

function invokeFormReflex (form, payload = {}) {
  payload.token = meta.token
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_reflex'
  input.value = JSON.stringify(payload)
  form.appendChild(input)
}

function invokeReflex (event) {
  let element
  let detail = {}

  try {
    element = findClosestReflex(event.target)
    if (!element) return
    if (!isRegisteredEvent(event.type, element.tagName)) return

    lifecycle.dispatch(lifecycle.events.beforeStart, element)

    const frameId = findFrameId(element)
    let frame
    if (frameId) {
      frame = findFrame(frameId)
      if (!frame) return
    }

    let driver = 'window'
    if (frame) driver = 'frame'
    if (element.tagName.toLowerCase() === 'form') driver = 'form'

    const payload = { driver, element: buildAttributePayload(element) }
    detail = { ...payload, frame, element }
    meta.element.dataset.busy = true
    meta.element.detail = detail

    lifecycle.dispatch(lifecycle.events.start, element, detail)

    if (driver !== 'form') event.preventDefault()

    switch (driver) {
      case 'frame':
        invokeFrameReflex(frame, payload)
        break
      case 'form':
        invokeFormReflex(element, payload)
        break
      case 'window':
        invokeWindowReflex(payload)
        break
    }
  } catch (error) {
    detail.error = error
    console.error(`TurboReflex encountered an unexpected error!`, detail)
    lifecycle.dispatch(lifecycle.events.error, element || document, detail)
  }
}

// wire things up and setup default events
registerEventListener(invokeReflex)
registerEvent('change', ['input', 'select', 'textarea'])
registerEvent('submit', ['form'])
registerEvent('click', ['*'])

export default {
  registerEvent,
  get registeredEvents () {
    return { ...registeredEvents }
  },
  get lifecycleEvents () {
    return [...Object.values(lifecycle.events)]
  },
  get logLevel () {
    return lifecycle.logLevel
  },
  set logLevel (value) {
    return (lifecycle.logLevel = value)
  }
}
