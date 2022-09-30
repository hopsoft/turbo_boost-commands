import { meta } from '../elements'
import { build as buildURL } from '../urls'
import lifecycle from '../lifecycle'

function finalize (lifecycleEventName) {
  const detail = meta.element.detail || {}
  const target = detail.element || document
  delete meta.element.dataset.busy
  delete meta.element.detail
  lifecycle.dispatch(lifecycleEventName, target, detail)
  lifecycle.dispatch(lifecycle.events.finish, target, detail)
}

function aborted (event) {
  const xhr = event.target
  const detail = { ...event.detail, ...(meta.element.detail || {}) }
  debugger
  finalize(lifecycle.events.abort)
}

function errored (event) {
  const xhr = event.target
  const detail = { ...event.detail, ...(meta.element.detail || {}) }
  finalize(lifecycle.events.error)
}

function loaded (event) {
  const xhr = event.target
  const content = xhr.responseText
  const hijacked = xhr.getResponseHeader('TurboReflex-Hijacked') === 'true'

  if (xhr.status >= 200 && xhr.status <= 299) {
    if (hijacked) {
      const head = '<turbo-stream'
      const tail = '</turbo-stream>'
      const headIndex = content.indexOf(head)
      const tailIndex = content.lastIndexOf(tail)
      if (headIndex >= 0 && tailIndex >= 0) {
        const streams = content.slice(headIndex, tailIndex + tail.length)
        document.body.insertAdjacentHTML('beforeend', streams)
      }
    } else {
      const head = '<html'
      const tail = '</html'
      const headIndex = content.indexOf(head)
      const tailIndex = content.lastIndexOf(tail)
      if (headIndex >= 0 && tailIndex >= 0) {
        const html = content.slice(
          content.indexOf('>', headIndex) + 1,
          tailIndex
        )
        document.documentElement.innerHTML = html
      }
    }
    finalize(lifecycle.events.success)
  } else {
    const { status, statusText } = xhr
    const detail = {
      responseStatus: status,
      responseStatusText: statusText,
      responseText: xhr.responseText
    }
    xhr.dispatchEvent(new CustomEvent('error', { detail }))
  }
}

function invokeReflex (payload) {
  const url = buildURL(window.location.href)
  url.searchParams.set('turbo_reflex', JSON.stringify(payload))
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.setRequestHeader('TurboReflex-Token', meta.token)
  xhr.addEventListener('abort', aborted)
  xhr.addEventListener('error', errored)
  xhr.addEventListener('load', loaded)
  xhr.send()
}

export default invokeReflex
