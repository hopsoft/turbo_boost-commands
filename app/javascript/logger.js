import lifecycle from './lifecycle'

let currentLogLevel = 'unknown'

const logLevels = {
  debug: Object.values(lifecycle.events),
  info: Object.values(lifecycle.events),
  warn: [
    lifecycle.events.abort,
    lifecycle.events.clientError,
    lifecycle.events.missingFrame,
    lifecycle.events.missingFrameSrc,
    lifecycle.events.serverError
  ],
  error: [
    lifecycle.events.clientError,
    lifecycle.events.missingFrame,
    lifecycle.events.missingFrameSrc,
    lifecycle.events.serverError
  ],
  unknown: []
}

Object.values(lifecycle.events).forEach(name => {
  addEventListener(name, event => {
    if (logLevels[currentLogLevel].includes(event.type)) {
      const level = currentLogLevel === 'debug' ? 'log' : currentLogLevel
      console[level](event.type, event.detail)
    }
  })
})

export default {
  get logLevel () {
    return currentLogLevel
  },
  set logLevel (value) {
    if (!Object.keys(logLevels).includes(value)) value = 'unknown'
    return (currentLogLevel = value)
  }
}
