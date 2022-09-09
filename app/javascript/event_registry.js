const registeredEvents = {}
let eventListener

function registerEventListener (fn) {
  eventListener = fn
}

function registerEvent (eventName, tagNames) {
  registeredEvents[eventName] = tagNames
  document.removeEventListener(eventName, eventListener, true)
  document.addEventListener(eventName, eventListener, true)
}

function isRegisteredEvent (eventName, tagName) {
  tagName = tagName.toLowerCase()
  return (
    registeredEvents[eventName].includes(tagName) ||
    (!Object.values(registeredEvents)
      .flat()
      .includes(tagName) &&
      registeredEvents[eventName].includes('*'))
  )
}

export {
  registerEventListener,
  registerEvent,
  registeredEvents,
  isRegisteredEvent
}
