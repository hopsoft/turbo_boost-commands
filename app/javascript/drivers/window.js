import meta from '../meta'
import lifecycle from '../lifecycle'
import urls from '../urls'
import renderer from '../renderer'

function aborted (event) {
  const xhr = event.target
  lifecycle.dispatch(lifecycle.events.abort, window, { xhr, ...event.detail })
}

function errored (event) {
  const xhr = event.target

  xhr.getResponseHeader('TurboReflex') === 'Append'
    ? renderer.append(xhr.responseText)
    : renderer.replaceDocument(xhr.responseText)

  const error = `Server returned a ${xhr.status} status code! TurboReflex requires 2XX-3XX status codes.`
  lifecycle.dispatchClientError({ xhr, ...event.detail, error })
}

function loaded (event) {
  const xhr = event.target
  if (xhr.status < 200 || xhr.status > 399) return errored(event)
  const content = xhr.responseText
  xhr.getResponseHeader('TurboReflex') === 'Append'
    ? renderer.append(xhr.responseText)
    : renderer.replaceDocument(xhr.responseText)
}

function invokeReflex (payload) {
  const src = payload.src
  payload = { ...payload }
  delete payload.src

  try {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', urls.build(src, payload), true)
    xhr.setRequestHeader(
      'Accept',
      'text/vnd.turbo-reflex.html, text/html, application/xhtml+xml'
    )
    xhr.setRequestHeader('TurboReflex-Token', meta.token)
    meta.uiStateBase64Chunks.forEach((chunk, i) =>
      xhr.setRequestHeader(
        `TurboReflex-UiState-${i.toString().padStart(6, '0')}`,
        chunk
      )
    )

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
