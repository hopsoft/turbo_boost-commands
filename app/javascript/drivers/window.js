import elements from '../elements'
import lifecycle from '../lifecycle'
import urls from '../urls'

function finalize (lifecycleEventName, detail = {}) {
  detail = { ...elements.metaElement.detail, ...detail }
  const target = detail.element || document
  delete elements.metaElement.dataset.busy
  delete elements.metaElement.detail
  lifecycle.dispatch(lifecycleEventName, target, detail)
  lifecycle.dispatch(lifecycle.events.finish, target, detail)
}

function aborted (event) {
  finalize(lifecycle.events.abort)
}

function errored (event) {
  const xhr = event.target
  const { status, statusText } = xhr
  const detail = {
    ...event.detail,
    responseStatus: status,
    responseStatusText: statusText,
    responseText: xhr.responseText
  }
  finalize(lifecycle.events.error, detail)
}

function loaded (event) {
  const xhr = event.target
  const success = xhr.status >= 200 && xhr.status <= 299

  if (!success) return errored(event)

  const content = xhr.responseText
  const hijacked = xhr.getResponseHeader('TurboReflex-Hijacked') === 'true'

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
      const html = content.slice(content.indexOf('>', headIndex) + 1, tailIndex)
      document.documentElement.innerHTML = html
    }
  }

  finalize(lifecycle.events.success)
}

function invokeReflex (payload) {
  const url = urls.build(window.location.href)
  url.searchParams.set('turbo_reflex', JSON.stringify(payload))
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.setRequestHeader('TurboReflex-Token', elements.metaElementToken)
  xhr.addEventListener('abort', aborted)
  xhr.addEventListener('error', errored)
  xhr.addEventListener('load', loaded)
  xhr.send()
}

export default { invokeReflex }
