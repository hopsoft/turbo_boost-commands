import './turbo'
import delegates from './delegates'
import drivers from './drivers'
import elements from './elements'
import lifecycle from './lifecycle'
import urls from './urls'

function invokeReflex (event) {
  let element
  let detail = {}

  try {
    element = elements.findClosestReflex(event.target)
    if (!element) return
    if (!delegates.isRegistered(event.type, element.tagName)) return

    lifecycle.dispatch(lifecycle.events.beforeStart, element)

    const frameId = elements.findFrameId(element)
    let frame
    if (frameId) {
      frame = elements.findFrame(frameId)
      if (!frame) return
    }

    let driver = 'window'
    if (frame) driver = 'frame'
    if (element.tagName.toLowerCase() === 'form') driver = 'form'

    const payload = { driver, element: elements.buildAttributePayload(element) }
    detail = { ...payload, frame, element }
    elements.metaElement.dataset.busy = true
    elements.metaElement.detail = detail
    lifecycle.dispatch(lifecycle.events.start, element, detail)

    if (driver !== 'form') event.preventDefault()
    if (driver === 'frame') drivers.frame.invokeReflex(frame, payload)
    if (driver === 'window') drivers.window.invokeReflex(payload)
    if (driver === 'form') drivers.form.invokeReflex(element, payload)
  } catch (error) {
    lifecycle.dispatch(lifecycle.events.error, element || document, {
      ...detail,
      error
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
    return lifecycle.logLevel
  },
  set logLevel (value) {
    return (lifecycle.logLevel = value)
  }
}
