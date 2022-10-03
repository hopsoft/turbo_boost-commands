import elements from '../elements'
import lifecycle from '../lifecycle'
import urls from '../urls'

function aborted (event) {
  const xhr = event.target
  lifecycle.dispatch(lifecycle.events.abort, window, { xhr, ...event.detail })
}

function errored (event) {
  const xhr = event.target
  lifecycle.dispatch(
    lifecycle.events.clientError,
    window,
    {
      xhr,
      ...event.detail,
      error: `Server returned a ${xhr.status} status code! TurboReflex requires 2XX status codes. Server message: ${xhr.statusText}`
    },
    true
  )
}

function loaded (event) {
  const xhr = event.target
  const content = xhr.responseText
  const hijacked = xhr.getResponseHeader('TurboReflex-Hijacked') === 'true'
  if (xhr.status < 200 || xhr.status > 299) errored(event)

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
}

function invokeReflex (payload) {
  const src = payload.src
  payload = { ...payload }
  delete payload.src

  try {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', urls.build(src, payload), true)
    xhr.setRequestHeader('TurboReflex-Token', elements.metaElementToken)
    xhr.addEventListener('abort', aborted)
    xhr.addEventListener('error', errored)
    xhr.addEventListener('load', loaded)
    xhr.send()
  } catch (ex) {
    const message = `Unexpected error sending HTTP request! ${ex.message}`
    errored(ex, { detail: { message } })
  }
}

export default { invokeReflex }
