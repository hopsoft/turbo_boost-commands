import './turbo'
import schema from './schema'
import { dispatch } from './events'
import activity from './activity'
import delegates from './delegates'
import drivers from './drivers'
import meta from './meta'
import elements from './elements'
import lifecycle from './lifecycle'
import logger from './logger'
import { state } from './state'
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
    dispatch(lifecycle.events.start, element, payload)

    if (['frame', 'window'].includes(driver.name)) event.preventDefault()

    meta.busy = true
    setTimeout(() => (meta.busy = false), 10)

    switch (driver.name) {
      case 'method':
        return driver.invokeReflex(element, payload)
      case 'form':
        return driver.invokeReflex(element, payload)
      case 'frame':
        return driver.invokeReflex(driver.frame, payload)
      case 'window':
        return driver.invokeReflex(payload)
    }
  } catch (error) {
    dispatch(lifecycle.events.clientError, element, {
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
// delegates.register('mousedown', [
//   `[${schema.reflexAttribute}][${schema.methodAttribute}]`
// ])
delegates.register('submit', [`form[${schema.reflexAttribute}]`])
delegates.register('click', [`[${schema.reflexAttribute}]`])

export default self.TurboReflex = {
  logger,
  schema,
  registerEventDelegate: delegates.register,
  get eventDelegates () {
    return { ...delegates.events }
  },
  get lifecycleEvents () {
    return [...Object.values(lifecycle.events)]
  },
  get state () {
    return state
  }
}
