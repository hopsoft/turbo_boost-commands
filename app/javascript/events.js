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

export function dispatch (name, target, options = {}) {
  options = options || {}
  options.detail = options.detail || {}
  target = target || document
  const evt = new CustomEvent(name, { ...options, bubbles: true })
  target.dispatchEvent(evt)
  return evt
}
