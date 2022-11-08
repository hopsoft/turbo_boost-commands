import { allEvents as events } from './events'

let currentLevel = 'unknown'

const logLevels = {
  debug: Object.values(events),
  info: Object.values(events),
  warn: [events.abort, events.clientError, events.serverError],
  error: [events.clientError, events.serverError],
  unknown: []
}

Object.values(events).forEach(name => {
  addEventListener(name, event => {
    if (logLevels[currentLevel].includes(event.type)) {
      const level = currentLevel === 'debug' ? 'log' : currentLevel
      console[level](event.type, { target: event.target, detail: event.detail })
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
