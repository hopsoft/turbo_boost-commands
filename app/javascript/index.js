import './turbo'
import activity from './activity'
import delegates from './delegates'
import drivers from './drivers'
import elements from './elements'
import lifecycle from './lifecycle'
import logger from './logger'
import urls from './urls'
import uuids from './uuids'

function invokeReflex (event) {
  let element

  try {
    element = elements.findClosestReflex(event.target)
    if (!element) return
    if (!delegates.isRegistered(event.type, element.tagName)) return

    // payload sent to server (also used for lifecycle event.detail)
    const payload = {
      id: `reflex-${uuids.v4()}`,
      name: element.dataset.turboReflex,
      driver: null,
      frameId: null,
      elementId: element.id.length > 0 ? element.id : null,
      elementAttributes: elements.buildAttributePayload(element)
    }

    activity.add(payload)
    lifecycle.dispatch(lifecycle.events.beforeStart, element, payload)

    const frameId = elements.findFrameId(element)
    payload.frameId = frameId
    let frame
    if (frameId) {
      frame = elements.findFrame(frameId)
      if (!frame) return
    }

    let driver = 'window'
    if (frame) driver = 'frame'
    if (element.tagName.toLowerCase() === 'form') driver = 'form'

    payload.driver = driver
    payload.startedAt = new Date().getTime()
    lifecycle.dispatch(lifecycle.events.start, element, payload)

    if (driver !== 'form') event.preventDefault()
    if (driver === 'frame') drivers.frame.invokeReflex(frame, payload)
    if (driver === 'window') drivers.window.invokeReflex(payload)
    if (driver === 'form') drivers.form.invokeReflex(element, payload)
  } catch (error) {
    lifecycle.dispatch(lifecycle.events.clientError, element, {
      error,
      ...payload
    })
  }
}

// wire things up and setup defaults for event delegation
delegates.handler = invokeReflex
delegates.register('change', ['input', 'select', 'textarea'])
delegates.register('submit', ['form'])
delegates.register('click', ['*'])

export default {
  registerEvent: delegates.register,
  get registeredEvents () {
    return { ...delegates.events }
  },
  get lifecycleEvents () {
    return [...Object.values(lifecycle.events)]
  },
  get logLevel () {
    return logger.logLevel
  },
  set logLevel (value) {
    return (logger.logLevel = value)
  }
}
