export const lifecycleEvents = {
  start: 'turbo-reflex:start',
  success: 'turbo-reflex:success',
  finish: 'turbo-reflex:finish',
  abort: 'turbo-reflex:abort',
  clientError: 'turbo-reflex:client-error',
  serverError: 'turbo-reflex:server-error'
}

export const stateEvents = {
  beforeStateChange: 'turbo-reflex:before-state-change',
  stateChange: 'turbo-reflex:state-change'
}

export const allEvents = { ...lifecycleEvents, ...stateEvents }

export function dispatch (name, target = document, detail = {}, raise = false) {
  try {
    target = target || document
    const event = new CustomEvent(name, {
      detail,
      cancelable: false,
      bubbles: true
    })
    target.dispatchEvent(event)
  } catch (error) {
    if (raise) throw error
    dispatch(lifecycleEvents.clientError, target, { error, ...detail }, true)
  }
}
