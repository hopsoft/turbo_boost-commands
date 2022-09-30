import lifecycle from './lifecycle'

let currentLevel = 'unknown'

const logLevels = {
  debug: Object.values(lifecycle.events),
  info: Object.values(lifecycle.events),
  warn: [
    lifecycle.events.abort,
    lifecycle.events.clientError,
    lifecycle.events.serverError
  ],
  error: [lifecycle.events.clientError, lifecycle.events.serverError],
  unknown: []
}

Object.values(lifecycle.events).forEach(name => {
  addEventListener(name, event => {
    if (logLevels[currentLevel].includes(event.type)) {
      const level = currentLevel === 'debug' ? 'log' : currentLevel
      console[level](event.type, event.detail)
    }
  })
})

export default {
  get level () {
    return currentLevel
  },
  set level (value) {
    if (!Object.keys(logLevels).includes(value)) value = 'unknown'
    return (currentLevel = value)
  }
}
