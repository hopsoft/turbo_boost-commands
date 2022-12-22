import '@turbo-boost/streams'
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

function buildCommandPayload (id, element) {
  return {
    id, // uniquely identifies the command
    name: element.dataset.command,
    elementId: element.id.length > 0 ? element.id : null,
    elementAttributes: elements.buildAttributePayload(element),
    startedAt: new Date().getTime()
  }
}

function invokeCommand (event) {
  let element
  let payload = {}

  try {
    element = elements.findClosestCommand(event.target)
    if (!element) return
    if (!delegates.isRegisteredForElement(event.type, element)) return

    const commandId = `command-${uuids.v4()}`
    let driver = drivers.find(element)
    let payload = {
      ...buildCommandPayload(commandId, element),
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
          message: `An event handler for '${lifecycle.events.start}' prevented default behavior and blocked command invocation!`,
          source: startEvent
        }
      })

    // the element and thus the driver may have changed based on the start event handler(s)
    driver = drivers.find(element)
    payload = {
      ...buildCommandPayload(commandId, element),
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
        return driver.invokeCommand(element, payload)
      case 'form':
        return driver.invokeCommand(element, payload)
      case 'frame':
        return driver.invokeCommand(driver.frame, payload)
      case 'window':
        return driver.invokeCommand(payload)
    }
  } catch (error) {
    dispatch(lifecycle.events.clientError, element, {
      detail: { ...payload, error }
    })
  }
}

// wire things up and setup defaults for event delegation
delegates.handler = invokeCommand
delegates.register('change', [
  `input[${schema.commandAttribute}]`,
  `select[${schema.commandAttribute}]`,
  `textarea[${schema.commandAttribute}]`
])
delegates.register('submit', [`form[${schema.commandAttribute}]`])
delegates.register('click', [`[${schema.commandAttribute}]`])

self.TurboBoost = TurboBoost || {}

self.TurboBoost.Commands = {
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

export default self.TurboBoost.Commands
