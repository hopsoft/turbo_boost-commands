import headers from './headers'
import lifecycle from './lifecycle'
import urls from './urls'
import { dispatch } from './events'
import { render } from './renderer'

const parseError = error => {
  const message = `Unexpected error performing a TurboBoost Command! ${error.message}`
  dispatch(lifecycle.events.clientError, document, { detail: { message, error } }, true)
}

const parseAndRenderResponse = frameId => response => {
  const { strategy } = headers.tokenize(response.headers.get(headers.RESPONSE_HEADER))
  response.text().then(content => render(strategy, content, frameId))
}

const invoke = (payload = {}) => {
  try {
    fetch(urls.commandInvocationURL.href, {
      method: 'POST',
      headers: headers.prepare({}),
      body: JSON.stringify(payload)
    })
      .then(parseAndRenderResponse(payload.frameId))
      .catch(parseError)
  } catch (error) {
    parseError(error)
  }
}

export { invoke }
