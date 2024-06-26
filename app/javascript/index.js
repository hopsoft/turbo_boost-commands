import './turbo'
import schema from './schema'
import { dispatch, commandEvents } from './events'
import activity from './activity'
import confirmation from './confirmation'
import delegates from './delegates'
import drivers from './drivers'
import elements from './elements'
import './lifecycle'
import logger from './logger'
import state from './state'
import uuids from './uuids'
import VERSION from './version'

const TurboBoost = self.TurboBoost || {}

const Commands = {
  VERSION,
  active: false,
  confirmation,
  logger,
  schema,
  events: commandEvents,
  registerEventDelegate: delegates.register,
  get eventDelegates() {
    return delegates.events
  }
}

function buildCommandPayload(id, element) {
  return {
    csrfToken: document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'), // -- Rails CSRF token
    id, //-------------------------------------------------------------------------------------- Uniquely identifies the command invocation
    name: element.getAttribute(schema.commandAttribute), //------------------------------------- Command name
    elementId: element.id.length ? element.id : null, //---------------------------------------- ID of the element that triggered the command
    elementAttributes: elements.buildAttributePayload(element), //------------------------------ Attributes of the element that triggered the command
    startedAt: Date.now(), //------------------------------------------------------------------- Start time of when the command was invoked
    state: {
      page: state.buildPageState(),
      signed: state.signed,
      unsigned: state.unsigned
    }
  }
}

async function invokeCommand(event) {
  let element
  let payload = {}

  try {
    element = elements.findClosestCommand(event.target)
    if (!element) return
    if (!delegates.isRegisteredForElement(event.type, element)) return

    const commandId = uuids.v4()
    let driver = drivers.find(element)
    let payload = {
      ...buildCommandPayload(commandId, element),
      driver: driver.name,
      frameId: driver.frame ? driver.frame.id : null,
      src: driver.src
    }

    const startEvent = await dispatch(commandEvents.start, element, {
      cancelable: true,
      detail: payload
    })

    if (startEvent.defaultPrevented || (startEvent.detail.confirmation && event.defaultPrevented))
      return dispatch(commandEvents.abort, element, {
        detail: {
          message: `An event handler for '${commandEvents.start}' prevented default behavior and blocked command invocation!`,
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

    switch (driver.name) {
      case 'method':
        return driver.invokeCommand(element, payload)
      case 'form':
        return driver.invokeCommand(element, payload, event)
      case 'frame':
        return driver.invokeCommand(driver.frame, payload)
      case 'window':
        return driver.invokeCommand(self, payload)
    }
  } catch (error) {
    dispatch(commandEvents.clientError, element, {
      detail: { ...payload, error }
    })
  }
}

self.TurboBoost = { ...TurboBoost }

if (!self.TurboBoost.Commands) {
  // wire things up and setup defaults for event delegation
  delegates.handler = invokeCommand
  delegates.register('click', [`[${schema.commandAttribute}]`])
  delegates.register('submit', [`form[${schema.commandAttribute}]`])
  delegates.register('toggle', [`details[${schema.commandAttribute}]`])
  delegates.register('change', [
    `input[${schema.commandAttribute}]`,
    `select[${schema.commandAttribute}]`,
    `textarea[${schema.commandAttribute}]`
  ])

  self.TurboBoost.Commands = Commands
  self.TurboBoost.State = {
    initialize: state.initialize,
    get current() {
      return state.unsigned
    }
  }
}

export default Commands
