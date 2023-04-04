export const commandEvents = {
  start: 'turbo-boost:command:start',
  success: 'turbo-boost:command:success',
  finish: 'turbo-boost:command:finish',
  abort: 'turbo-boost:command:abort',
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
    // resolution
    values => {
      return Promise.resolve(evt, values)
    },

    // rejection (i.e. an error occurred or one of the promises was rejected)
    reason => {
      options.detail.sourceEvent?.preventDefault()
      evt.preventDefault()
      const message = `The ${name} event has been prevented because an error occurred or a promise was rejected in one of its handlers!`
      const detail = { message, reason, sourceEvent: evt }
      dispatch(commandEvents.abort, target, { detail })
      return Promise.reject(evt, reason)
    }
  )
}
