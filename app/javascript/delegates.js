let events = []
let eventListener

function register(eventName, selectors) {
  const match = events.find(evt => evt.name === eventName)
  if (match) events.splice(events.indexOf(match), 1)
  events = [{ name: eventName, selectors }, ...events]

  document.removeEventListener(eventName, eventListener, true)
  document.addEventListener(eventName, eventListener, true)

  return { ...events.find(evt => evt.name === eventName) }
}

function getRegisteredEventForElement(element) {
  return events.find(evt =>
    evt.selectors.find(selector => Array.from(document.querySelectorAll(selector)).find(el => el === element))
  )
}

function isRegisteredForElement(eventName, element) {
  const evt = getRegisteredEventForElement(element)
  return evt && evt.name === eventName
}

export default {
  register,
  getRegisteredEventForElement,
  isRegisteredForElement,
  get events() {
    return [...events]
  },
  set handler(fn) {
    eventListener = fn
  }
}
