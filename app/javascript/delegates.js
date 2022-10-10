const events = {}
let eventListener

function register (eventName, selectors) {
  events[eventName] = selectors
  document.addEventListener(eventName, eventListener, true)
}

function isRegisteredForElement (eventName, element) {
  const nate = events[eventName]
  const selectors = [...events[eventName]]
  let isRegistered = false

  while (!isRegistered && selectors.length > 0) {
    const selector = selectors.shift()
    isRegistered = Array.from(document.querySelectorAll(selector)).includes(
      element
    )
  }

  return isRegistered
}

export default {
  events,
  register,
  isRegisteredForElement,
  set handler (fn) {
    eventListener = fn
  }
}
