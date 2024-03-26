export const commandEvents = {
  start: 'turbo-boost:command:start',
  success: 'turbo-boost:command:success',
  finish: 'turbo-boost:command:finish',
  abort: 'turbo-boost:command:abort',
  clientError: 'turbo-boost:command:client-error',
  serverError: 'turbo-boost:command:server-error'
}

export const stateEvents = {
  stateChange: 'turbo-boost:state:change',
  stateInitialize: 'turbo-boost:state:initialize'
}

export const turboEvents = {
  frameLoad: 'turbo:frame-load',
  load: 'turbo:load'
}

export function dispatch(name, target, options = {}) {
  return new Promise(resolve => {
    options = options || {}
    options.detail = options.detail || {}
    target = target || document
    const evt = new CustomEvent(name, { ...options, bubbles: true })
    target.dispatchEvent(evt)
    resolve(evt)
  })
}
