import 'turbo_ready'
import './turbo'
import schema from './schema'
import { dispatch, allEvents as events } from './events'
import activity from './activity'
import delegates from './delegates'
import drivers from './drivers'
import meta from './meta'
import elements from './elements'
import lifecycle from './lifecycle'
import logger from './logger'
import state from './state'
import urls from './urls'
import uuids from './uuids'

function buildReflexPayload (id, element) {
  return {
    id, // reflex id
    name: element.dataset.turboReflex, // reflex name
    elementId: element.id.length > 0 ? element.id : null,
    elementAttributes: elements.buildAttributePayload(element),
    startedAt: new Date().getTime()
  }
}

function invokeReflex (event) {
  let element
  let payload = {}

  try {
    element = elements.findClosestReflex(event.target)
    if (!element) return
    if (!delegates.isRegisteredForElement(event.type, element)) return

    const reflexId = `reflex-${uuids.v4()}`
    let driver = drivers.find(element)
    let payload = {
      ...buildReflexPayload(reflexId, element),
      driver: driver.name,
      frameId: driver.frame ? driver.frame.id : null,
      src: driver.src
    }

    const startEvent = dispatch(lifecycle.events.start, element, {
      cancelable: true,
      detail: payload
    })

    if (startEvent.defaultPrevented)
      return dispatch(lifecycle.events.abort, element, {
        detail: {
          message: `An event handler for '${lifecycle.events.start}' prevented default behavior and blocked reflex invocation!`,
          source: startEvent
        }
      })

    // the element and thus the driver may have changed based on the start event handler(s)
    driver = drivers.find(element)
    payload = {
      ...buildReflexPayload(reflexId, element),
      driver: driver.name,
      frameId: driver.frame ? driver.frame.id : null,
      src: driver.src
    }

    activity.add(payload)

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
      detail: { ...payload, error }
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

self.TurboReflex = {
  logger,
  schema,
  registerEventDelegate: delegates.register,
  get eventDelegates () {
    return { ...delegates.events }
  },
  get events () {
    return { ...events }
  },
  get state () {
    return state.current
  },
  // delta of state changes made on the client
  get stateDelta () {
    return state.delta
  }
}

export default self.TurboReflex
