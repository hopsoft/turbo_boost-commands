import { allEvents as events } from './events'

let currentLevel = 'unknown'
let initialized = false
let history = []

const logLevels = {
  debug: Object.values(events),
  info: Object.values(events),
  warn: [events.abort, events.clientError, events.serverError],
  error: [events.clientError, events.serverError],
  unknown: []
}

const shouldLogEvent = event => {
  if (!logLevels[currentLevel].includes(event.type)) return false
  if (typeof console[currentLevel] !== 'function') return false

  const { detail } = event
  if (!detail.id) return true

  const key = `${event.type}-${detail.id}`
  if (history.includes(key)) return false

  if (history.length > 16) history.shift()
  history.push(key)

  return true
}

const logEvent = event => {
  if (shouldLogEvent(event)) {
    const { target, type, detail } = event
    const payload = {}
    if (detail.id) payload.id = detail.id
    if (detail.ms) payload.ms = detail.ms
    console[currentLevel](type, { ...payload, detail, target })
  }
}

if (!initialized) {
  initialized = true
  Object.values(events).forEach(name => addEventListener(name, event => logEvent(event)))
}

export default {
  get level() {
    return currentLevel
  },
  set level(value) {
    if (!Object.keys(logLevels).includes(value)) value = 'unknown'
    return (currentLevel = value)
  }
}
