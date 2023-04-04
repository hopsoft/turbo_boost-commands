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

export function dispatch (name, target, options = {}) {
  options = options || {}
  options.detail = { ...options.detail }
  options.detail.promises = options.detail.promises || []
  target = target || document
  const evt = new CustomEvent(name, { ...options, bubbles: true })
  target.dispatchEvent(evt)
  return Promise.all(evt.detail.promises).then(
    // resolution ............................................................................................
    values => {
      evt.detail.promiseResults = values

      switch (name) {
        case commandEvents.start:
          const value =
            values.find(
              value =>
                typeof value === 'object' &&
                value.method === 'TurboBoost.Commands.confirmMethod'
            ) || {}
          const { result } = value

          // IMPORTANT: explicit false check is required
          if (result === false) {
            evt.preventDefault()
            const detail = { message: 'The user aborted the command!' }
            dispatch(commandEvents.abort, target, { detail })
          }
      }

      return Promise.resolve(evt)
    },

    // rejection (i.e. an error occurred or one of the promises was rejected) ................................
    reason => {
      evt.preventDefault()
      const message = `The ${name} event has been prevented because an error occurred or a promise was rejected in one of its handlers!`
      dispatch(commandEvents.dispatchFailure, target, {
        detail: { message, reason }
      })
      return Promise.reject(evt)
    }
  )
}
