const registeredEvents = {}

function isMatch (eventName, tagName) {
  tagName = tagName.toLowerCase()
  return (
    registeredEvents[eventName].includes(tagName) ||
    (!Object.values(registeredEvents)
      .flat()
      .includes(tagName) &&
      registeredEvents[eventName].includes('*'))
  )
}

function getFrameId (reflexElement) {
  let frameId = reflexElement.dataset.turboReflexFrame
  frameId = frameId || reflexElement.closest('turbo-frame').id
  if (!frameId)
    console.error(
      `The reflex element does not specify a frame!`,
      `Please set the 'data-turbo-reflex-frame' attribute.`,
      reflexElement
    )
  return frameId
}

function getFrameElement (frameId) {
  const frameElement = document.getElementById(frameId)
  if (!frameElement) console.error(`The frame '${frameId}' does not exist!`)
  return frameElement
}

function getFrameSrc (frameElement) {
  const frameSrc = frameElement.dataset.turboReflexFrameSrc
  if (!frameSrc)
    console.error(
      `The 'data-turbo-reflex-frame-src' attribute for the frame '${frameId}' is not set!`,
      `This attribute is set automatically for frames that load their content after being inserted into the DOM;`,
      `however, frames that eager load their content server side on initial page render must set this attribute explicitly.`,
      frameElement
    )
  return frameSrc
}

function getTurboReflexToken () {
  return document.getElementById('turbo-reflex-token').getAttribute('content')
}

function getURL (value) {
  const a = document.createElement('a')
  a.href = value
  return new URL(a)
}

function getAttributes (reflexElement) {
  const reflexElementAttributes = Array.from(reflexElement.attributes).reduce(
    (memo, attribute) => {
      if (!attribute.name.includes('data-turbo-reflex'))
        memo[attribute.name] = attribute.value
      return memo
    },
    {}
  )
  reflexElementAttributes.tagName = reflexElement.tagName
  reflexElementAttributes.value = reflexElement.value
  return reflexElementAttributes
}

function invokeReflex (event) {
  const reflexElement = event.target.closest('[data-turbo-reflex]')
  if (!reflexElement) return
  if (!isMatch(event.type, event.target.tagName)) return

  event.preventDefault()
  event.stopPropagation()

  const frameId = getFrameId(reflexElement)
  if (!frameId) return

  const frameElement = getFrameElement(frameId)
  if (!frameElement) return

  const frameSrc = frameElement.dataset.turboReflexFrameSrc
  if (!frameSrc) return

  const reflexPayload = {
    token: getTurboReflexToken(),
    name: reflexElement.dataset.turboReflex,
    frame: frameId,
    element: getAttributes(reflexElement)
  }

  const frameURL = getURL(frameSrc)
  frameURL.searchParams.set('turbo_reflex', JSON.stringify(reflexPayload))
  frameElement.src = frameURL.toString()
}

function registerEvent (eventName, tagNames) {
  registeredEvents[eventName] = tagNames
  document.removeEventListener(eventName, invokeReflex, true)
  document.addEventListener(eventName, invokeReflex, true)
}

registerEvent('change', ['input', 'select', 'textarea'])
registerEvent('submit', ['form'])
registerEvent('click', ['*'])

export default { registerEvent, registeredEvents }
