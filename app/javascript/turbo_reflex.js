import './frame_sources'
import LifecycleEvents from './lifecycle_events'
import {
  buildAttributePayload,
  findClosestReflex,
  findClosestFrame,
  findFrameId,
  findFrame,
  findFrameSrc,
  meta
} from './elements'
import {
  registerEventListener,
  registerEvent,
  registeredEvents,
  isRegisteredEvent,
  logRegisteredEvents
} from './event_registry'

// fires before making a turbo HTTP request
addEventListener('turbo:before-fetch-request', event => {
  const frame = event.target
  if (frame !== meta.element.frame) return
  const { fetchOptions } = event.detail
  fetchOptions.headers['TurboReflex-Token'] = meta.token
})

function buildURL (urlString) {
  const a = document.createElement('a')
  a.href = urlString
  return new URL(a)
}

function invokeFrameReflex (frame, payload) {
  const src = findFrameSrc(frame)
  if (!src) return
  const url = buildURL(src)
  url.searchParams.set('turbo_reflex', JSON.stringify(payload))
  frame.dataset.turboReflexActive = true
  frame.src = url.toString()
}

function invokeFormReflex (form, payload = {}) {
  payload.token = meta.token
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_reflex'
  input.value = JSON.stringify(payload)
  form.appendChild(input)
}

function invokeWindowReflex (payload) {
  const url = buildURL(window.location.href)
  url.searchParams.set('turbo_reflex', JSON.stringify(payload))
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.setRequestHeader('TurboReflex-Token', meta.token)
  xhr.addEventListener('load', () => {
    // if hijacked
    const head = '<turbo-stream'
    const tail = '</turbo-stream>'
    const headIndex = xhr.responseText.indexOf(head)
    const tailIndex = xhr.responseText.lastIndexOf(tail)
    if (headIndex >= 0 && tailIndex >= 0) {
      const streams = xhr.responseText.slice(headIndex, tailIndex + tail.length)
      document.body.insertAdjacentHTML('beforeend', streams)
    }

    // else
    // replace/morph the body
  })
  xhr.addEventListener('error', () => {
    // TODO: handle errors
    debugger
  })
  xhr.addEventListener('abort', () => {
    // TODO: handle aborts
    debugger
  })
  xhr.send()
}

function invokeReflex (event) {
  let detail = {}

  try {
    let element = findClosestReflex(event.target)
    if (!element) return
    if (!isRegisteredEvent(event.type, element.tagName)) return

    LifecycleEvents.dispatch(LifecycleEvents.beforeStart, element)

    const frameId = findFrameId(element)
    let frame
    if (frameId) {
      frame = findFrame(frameId)
      if (!frame) return
    }

    let driver = 'window'
    if (frame) driver = 'frame'
    if (element.tagName.toLowerCase() === 'form') driver = 'form'

    const payload = { driver, element: buildAttributePayload(element) }
    detail = { ...payload, frame, element }
    const dataset = { busy: true, driver, reflex: element.dataset.turboReflex }

    meta.element.frame = frame
    Object.assign(meta.element.dataset, dataset)
    LifecycleEvents.dispatch(LifecycleEvents.start, element, detail)

    if (driver !== 'form') event.preventDefault()

    switch (driver) {
      case 'frame':
        invokeFrameReflex(frame, payload)
        break
      case 'form':
        invokeFormReflex(element, payload)
        break
      case 'window':
        invokeWindowReflex(payload)
        break
    }
  } catch (error) {
    detail.error = error
    console.error(`TurboReflex encountered an unexpected error!`, detail)
    LifecycleEvents.dispatch(LifecycleEvents.error, element || document, detail)
  }
}

// wire things up and setup default events
registerEventListener(invokeReflex)
registerEvent('change', ['input', 'select', 'textarea'])
registerEvent('submit', ['form'])
registerEvent('click', ['*'])

export default {
  registerEvent,
  logRegisteredEvents,
  logLifecycleEventNames: LifecycleEvents.logEventNames
}
