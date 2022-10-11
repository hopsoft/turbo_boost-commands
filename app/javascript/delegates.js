const events = {}
let eventListener

function register (eventName, selectors) {
  events[eventName] = selectors
  document.addEventListener(eventName, eventListener, true)
}

function getRegisteredEventNameForElement (element) {
  return Object.keys(events).find(eventName => {
    return !!events[eventName].find(selector =>
      Array.from(document.querySelectorAll(selector)).find(el => el === element)
    )
  })
}

function isRegisteredForElement (eventName, element) {
  return eventName === getRegisteredEventNameForElement(element)
}

export default {
  events,
  register,
  isRegisteredForElement,
  set handler (fn) {
    eventListener = fn
  }
}
