import elements from '../elements'
import lifecycle from '../lifecycle'
import urls from '../urls'
import renderer from '../renderer'

function aborted (event) {
  const xhr = event.target
  lifecycle.dispatch(lifecycle.events.abort, window, { xhr, ...event.detail })
}

function errored (event) {
  const xhr = event.target

  xhr.getResponseHeader('TurboReflex-Hijacked') === 'true'
    ? renderer.renderStreams(xhr.responseText)
    : renderer.renderDocument(xhr.responseText)

  const error = `Server returned a ${xhr.status} status code! TurboReflex requires 2XX status codes.`
  lifecycle.dispatchClientError({ xhr, ...event.detail, error })
}

function loaded (event) {
  const xhr = event.target
  if (xhr.status < 200 || xhr.status > 299) return errored(event)
  const content = xhr.responseText
  xhr.getResponseHeader('TurboReflex-Hijacked') === 'true'
    ? renderer.renderStreams(xhr.responseText)
    : renderer.renderDocument(xhr.responseText)
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
