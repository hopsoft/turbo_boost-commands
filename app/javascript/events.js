export const commandEvents = {
  start: 'turbo-boost:command:start',
  success: 'turbo-boost:command:success',
  finish: 'turbo-boost:command:finish',
  abort: 'turbo-boost:command:abort',
  dispatchFailure: 'turbo-boost:command:dispatch-failure',
  clientError: 'turbo-boost:command:client-error',
  serverError: 'turbo-boost:command:server-error'
}

export const stateEvents = {
  stateLoad: 'turbo-boost:state:load',
  stateChange: 'turbo-boost:state:change'
}

export const allEvents = { ...commandEvents, ...stateEvents }

function resolveStartEvent (event, promiseValues) {
  const value =
    promiseValues.find(
      value =>
        typeof value === 'object' &&
        value.method === 'TurboBoost.Commands.confirmMethod'
    ) || {}
  const { result } = value

  // IMPORTANT: explicit false check is required
  if (result === false) {
    event.preventDefault()
    dispatch(commandEvents.abort, event.target, {
      detail: { source: event, message: 'The user aborted the command!' }
    })
  }
}

export function dispatch (name, target, options = {}) {
  options = options || {}
  options.detail = { ...options.detail }
  options.detail.promises = options.detail.promises || []
  target = target || document
  const event = new CustomEvent(name, { ...options, bubbles: true })
  target.dispatchEvent(event)
  return Promise.all(event.detail.promises).then(
    // resolution ............................................................................................
    values => {
      try {
        event.detail.promiseResults = values
        if (name === commandEvents.start) resolveStartEvent(event, values)
        return Promise.resolve(event)
      } catch (error) {
        event.preventDefault()
        const message = `The dispatch encountered an error while resolving ${name}!`
        const detail = { message, error }
        dispatch(commandEvents.clientError, target, { detail })
        return Promise.reject(event)
      }
    },

    // rejection (i.e. an error occurred or one of the promises was rejected) ................................
    reason => {
      event.preventDefault()
      const message = `The ${name} event has been prevented because an error occurred or a promise was rejected in one of its handlers!`
      const detail = { message, reason }
      dispatch(commandEvents.dispatchFailure, target, { detail })
      return Promise.reject(event)
    }
  )
}
