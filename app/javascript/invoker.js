import headers from './headers'
import lifecycle from './lifecycle'
import state from './state'
import urls from './urls'
import { dispatch } from './events'
import { render } from './renderer'

const parseError = error => {
  const errorMessage = `Unexpected error performing a TurboBoost Command! ${error.message}`
  dispatch(lifecycle.events.clientError, document, { detail: { error: errorMessage } }, true)
}

const parseAndRenderResponse = response => {
  const { strategy } = headers.tokenize(response.headers.get(headers.RESPONSE_HEADER))

  // FAIL: Status outside the range of 200-399
  if (response.status < 200 || response.status > 399) {
    const error = `Server returned a ${response.status} status code! TurboBoost Commands require 2XX-3XX status codes.`
    dispatch(lifecycle.events.serverError, document, { detail: { error, response } }, true)
  }

  response.text().then(content => render(strategy, content))
}

const invoke = (payload = {}) => {
  try {
    fetch(urls.commandInvocationURL.href, {
      method: 'POST',
      headers: headers.prepare({}),
      body: JSON.stringify(payload)
    })
      .then(parseAndRenderResponse)
      .catch(parseError)
  } catch (error) {
    parseError(error)
  }
}

export { invoke }
