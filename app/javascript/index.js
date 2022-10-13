import './turbo'
import schema from './schema.js'
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
  let payload = {}

  try {
    element = elements.findClosestReflex(event.target)
    if (!element) return
    if (!delegates.isRegisteredForElement(event.type, element)) return

    const driver = drivers.find(element)

    // payload sent to server (also used for lifecycle event.detail)
    payload = {
      id: `reflex-${uuids.v4()}`,
      name: element.dataset.turboReflex,
      driver: driver.name,
      src: driver.src,
      frameId: driver.frame ? driver.frame.id : null,
      elementId: element.id.length > 0 ? element.id : null,
      elementAttributes: elements.buildAttributePayload(element),
      startedAt: new Date().getTime()
    }

    activity.add(payload)
    lifecycle.dispatch(lifecycle.events.start, element, payload)

    if (driver.name !== 'form') event.preventDefault()

    window.turboReflexActive = true
    setTimeout(() => (window.turboReflexActive = false), 10)

    switch (driver.name) {
      case 'form':
        return driver.invokeReflex(element, payload)
      case 'frame':
        return driver.invokeReflex(driver.frame, payload)
      case 'window':
        return driver.invokeReflex(payload)
    }
  } catch (error) {
    lifecycle.dispatch(lifecycle.events.clientError, element, {
      error,
      ...payload
    })
  }
}

// wire things up and setup defaults for event delegation
delegates.handler = invokeReflex
delegates.register('change', [
  `input[${schema.reflexAttribute}]`,
  `select[${schema.reflexAttribute}]`,
  `textarea[${schema.reflexAttribute}]`
])
delegates.register('submit', [`form[${schema.reflexAttribute}]`])
delegates.register('click', [`[${schema.reflexAttribute}]`])

export default {
  schema,
  logger,
  registerEventDelegate: delegates.register,
  get eventDelegates () {
    return { ...delegates.events }
  },
  get lifecycleEvents () {
    return [...Object.values(lifecycle.events)]
  }
}
