import './frame_sources'
import LifecycleEvents from './lifecycle_events'
import {
  buildAttributePayload,
  findClosestReflex,
  findClosestFrame,
  findFrameId,
  findFrame,
  findFrameSrc,
  metaElements
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
  const { turboReflexActive } = frame.dataset
  if (!turboReflexActive) return
  const { fetchOptions } = event.detail
  fetchOptions.headers[
    'TurboReflex-Token'
  ] = metaElements.turboReflexToken.getAttribute('content')
})

function buildURL (urlString) {
  const a = document.createElement('a')
  a.href = urlString
  return new URL(a)
}

function invokeFormReflex (form, payload = {}) {
  payload.token = metaElements.turboReflexToken.getAttribute('content')
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_reflex'
  input.value = JSON.stringify(payload)
  form.appendChild(input)
}

function invokeFrameReflex (frame, payload) {
  const src = findFrameSrc(frame)
  if (!src) return
  const url = buildURL(src)
  url.searchParams.set('turbo_reflex', JSON.stringify(payload))
  frame.src = url.toString()
}

function invokeWindowReflex (payload) {
  const url = buildURL(window.location.href)
  url.searchParams.set('turbo_reflex', JSON.stringify(payload))
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.setRequestHeader(
    'TurboReflex-Token',
    metaElements.turboReflexToken.getAttribute('content')
  )
  xhr.addEventListener('load', () => {
    const streams = xhr.responseText.match(
      /<\s*turbo-stream.*<\/turbo-stream\s*>/i
    )
    document.body.insertAdjacentHTML('beforeend', streams)
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

    Object.assign(metaElements.turboReflex.dataset, dataset)
    LifecycleEvents.dispatch(LifecycleEvents.start, element, detail)

    switch (driver) {
      case 'frame':
        event.preventDefault()
        debugger
        //return invokeFrameReflex(frame, payload)
        break
      case 'form':
        debugger
        //return invokeFormReflex(element, payload)
        break
      case 'window':
        event.preventDefault()
        return invokeWindowReflex(payload)
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
