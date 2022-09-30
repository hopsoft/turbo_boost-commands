const events = {
  beforeStart: 'turbo-reflex:before-start',
  start: 'turbo-reflex:start',
  success: 'turbo-reflex:success',
  finish: 'turbo-reflex:finish',
  abort: 'turbo-reflex:abort',
  error: 'turbo-reflex:error',
  missingFrame: 'turbo-reflex:missing-frame',
  missingFrameSrc: 'turbo-reflex:missing-frame-src'
}

const logLevels = {
  debug: Object.values(events),
  info: Object.values(events),
  warn: [
    events.abort,
    events.error,
    events.missingFrame,
    events.missingFrameSrc
  ],
  error: [
    events.abort,
    events.error,
    events.missingFrame,
    events.missingFrameSrc
  ],
  unknown: []
}

let currentLogLevel = 'unknown'

Object.values(events).forEach(name => {
  document.addEventListener(name, event => {
    if (logLevels[currentLogLevel].includes(event.type)) {
      const level = currentLogLevel === 'debug' ? 'log' : currentLogLevel
      console[level](event.type, event)
    }
  })
})

export default {
  events: { ...events },
  dispatch: (name, target = document, detail = {}) => {
    const event = new CustomEvent(name, {
      detail,
      cancelable: true,
      bubbles: true
    })
    target.dispatchEvent(event)
  },
  get logLevel () {
    return currentLogLevel
  },
  set logLevel (value) {
    if (!Object.keys(logLevels).includes(value)) value = 'unknown'
    return (currentLogLevel = value)
  }
}
