import meta from '../meta'
import state from '../state'
import { dispatch } from '../events'
import lifecycle from '../lifecycle'
import urls from '../urls'
import renderer from '../renderer'

function aborted (event) {
  const xhr = event.target
  dispatch(lifecycle.events.abort, document, {
    detail: { ...event.detail, xhr }
  })
}

function errored (event) {
  const xhr = event.target

  xhr.getResponseHeader('TurboBoost') === 'Append'
    ? renderer.append(xhr.responseText)
    : renderer.replaceDocument(xhr.responseText)

  const error = `Server returned a ${xhr.status} status code! TurboBoost Commands require 2XX-3XX status codes.`

  dispatch(
    lifecycle.events.clientError,
    document,
    { detail: { ...event.detail, error, xhr } },
    true
  )
}

function loaded (event) {
  const xhr = event.target
  if (xhr.status < 200 || xhr.status > 399) return errored(event)
  const content = xhr.responseText
  xhr.getResponseHeader('TurboBoost') === 'Append'
    ? renderer.append(xhr.responseText)
    : renderer.replaceDocument(xhr.responseText)
}

function invokeCommand (payload) {
  const src = payload.src
  payload = { ...payload }
  delete payload.src

  try {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', urls.build(src, payload), true)
    xhr.setRequestHeader(
      'Accept',
      'text/vnd.turbo-boost.html, text/html, application/xhtml+xml'
    )
    xhr.setRequestHeader('TurboBoost-Token', meta.token)
    state.payloadChunks.forEach((chunk, i) =>
      xhr.setRequestHeader(
        `TurboBoost-State-${i.toString().padStart(4, '0')}`,
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

export default { invokeCommand }
