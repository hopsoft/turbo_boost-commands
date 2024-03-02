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
