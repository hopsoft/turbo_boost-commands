export const lifecycleEvents = {
  start: 'turbo-reflex:start',
  success: 'turbo-reflex:success',
  finish: 'turbo-reflex:finish',
  abort: 'turbo-reflex:abort',
  clientError: 'turbo-reflex:client-error',
  serverError: 'turbo-reflex:server-error'
}

export const stateEvents = {
  stateLoad: 'turbo-reflex:state-load',
  stateChange: 'turbo-reflex:state-change'
}

export const allEvents = { ...lifecycleEvents, ...stateEvents }

export function dispatch (name, target, options = {}, raise = false) {
  options.detail = options.detail || {}
  try {
    target = target || document
    const event = new CustomEvent(name, { ...options, bubbles: true })
    target.dispatchEvent(event)
    return event
  } catch (error) {
    if (raise) throw error
    options.detail.error = error
    dispatch(lifecycleEvents.clientError, target, options, true)
  }
}
