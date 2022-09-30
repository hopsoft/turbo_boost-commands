const events = {}
let eventListener

function register (eventName, tagNames) {
  events[eventName] = tagNames
  document.addEventListener(eventName, eventListener, true)
}

function isRegistered (eventName, tagName) {
  tagName = tagName.toLowerCase()
  return (
    events[eventName].includes(tagName) ||
    (!Object.values(events)
      .flat()
      .includes(tagName) &&
      events[eventName].includes('*'))
  )
}

export default {
  events,
  register,
  isRegistered,
  set handler (fn) {
    eventListener = fn
  }
}
