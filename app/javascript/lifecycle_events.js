const events = {
  beforeStart: 'turbo-reflex:before-start',
  start: 'turbo-reflex:start',
  finish: 'turbo-reflex:finish',
  error: 'turbo-reflex:error',
  missingFrameId: 'turbo-reflex:missing-frame-id',
  missingFrame: 'turbo-reflex:missing-frame',
  missingFrameSrc: 'turbo-reflex:missing-frame-src'
}

function dispatch (name, target = document, detail = {}) {
  const event = new CustomEvent(name, {
    detail,
    cancelable: true,
    bubbles: true
  })
  target.dispatchEvent(event)
}

function logEventNames () {
  Object.values(events).forEach(name => console.log(name))
}

export default { ...events, dispatch, logEventNames }
