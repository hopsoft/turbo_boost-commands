const registeredEvents = {}
const frameSources = {}

// fires before making a turbo HTTP request
addEventListener('turbo:before-fetch-request', event => {
  const frame = event.target
  const { turboReflexActive } = frame.dataset
  if (turboReflexActive) {
    const { fetchOptions } = event.detail
    fetchOptions.headers['Turbo-Reflex'] = event.target.id
  }
})

// fires after receiving a turbo HTTP response
addEventListener('turbo:before-fetch-response', event => {
  const frame = event.target
  frameSources[frame.id] = frame.src
  delete frame.dataset.turboReflexActive
})

// fires when a frame element is navigated
addEventListener('turbo:frame-load', event => {
  const frame = event.target
  frame.dataset.turboReflexSrc =
    frameSources[frame.id] || frame.src || frame.dataset.turboReflexSrc
  delete frameSources[frame.id]
})

// fires before a stream response is rendered
addEventListener('turbo:before-stream-render', event => {
  const stream = event.target
  const frame = stream.templateContent.querySelector('turbo-frame')
  if (!frame) return
  const frameId = frame.id
  setTimeout(() => {
    const f = document.getElementById(frameId)
    f.dataset.turboReflexSrc =
      frameSources[frame.id] || f.src || f.dataset.turboReflexSrc
    delete frameSources[frameId]
  }, 100)
})

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
  let frameId =
    reflexElement.dataset.turboReflexFrame || reflexElement.dataset.turboFrame
  if (!frameId) {
    const frame = reflexElement.closest('turbo-frame')
    if (frame) frameId = frame.id
  }
  if (!frameId)
    console.error(
      `The reflex element does not specify a frame!`,
      `Please move the reflex element inside a <turbo-frame> or set the 'data-turbo-reflex-frame' or 'data-turbo-frame' attribute.`,
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
  const frameSrc = frameElement.dataset.turboReflexSrc || frameElement.src
  if (!frameSrc)
    console.error(
      `The the 'src' for frame '${frameElement.id}' is unknown!`,
      `TurboReflex uses 'src' to (re)render frame content after the reflex is invoked.`,
      `Please set the 'src' or 'data-turbo-reflex-src' attribute on the <turbo-frame> element.`,
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

  if (reflexElement.tagName.toLowerCase() === 'select') {
    if (reflexElement.multiple) {
      reflexElementAttributes.values = Array.from(reflexElement.options).reduce(
        (memo, option) => {
          if (option.selected) memo.push(option.value)
          return memo
        },
        []
      )
    } else {
      reflexElementAttributes.value =
        reflexElement.options[reflexElement.selectedIndex].value
    }
  }

  if (
    reflexElement.tagName.toLowerCase() === 'input' &&
    reflexElement.type === 'checkbox'
  ) {
    reflexElementAttributes.checked = !!reflexElement.checked
  }

  return reflexElementAttributes
}

function invokeReflex (event) {
  const reflexElement = event.target.closest('[data-turbo-reflex]')
  if (!reflexElement) return
  if (!isMatch(event.type, reflexElement.tagName)) return

  const frameId = getFrameId(reflexElement)
  if (!frameId) return

  const frameElement = getFrameElement(frameId)
  if (!frameElement) return

  const frameSrc = getFrameSrc(frameElement)
  if (!frameSrc) return

  const reflexPayload = {
    token: getTurboReflexToken(),
    name: reflexElement.dataset.turboReflex,
    frame: frameId,
    element: getAttributes(reflexElement)
  }

  frameElement.dataset.turboReflexActive = true

  if (reflexElement.tagName.toLowerCase() === 'form') {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = 'turbo_reflex'
    input.value = JSON.stringify(reflexPayload)
    reflexElement.appendChild(input)
  } else {
    event.preventDefault()
    event.stopPropagation()
    const frameURL = getURL(frameSrc)
    frameURL.searchParams.set('turbo_reflex', JSON.stringify(reflexPayload))
    frameElement.src = frameURL.toString()
  }
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
