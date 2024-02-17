import headers from './headers'
import lifecycle from './lifecycle'
import renderer from './renderer'
import state from './state'
import urls from './urls'
import { dispatch } from './events'

const parseError = error => {
  const errorMessage = `Unexpected error performing a TurboBoost Command! ${error.message}`
  dispatch(lifecycle.events.clientError, document, { detail: { error: errorMessage } }, true)
}

const parseResponse = response => {
  const ok = response.status >= 200 && response.status <= 399

  // OK: Response status was between 200-399
  if (ok) return response.text().then(content => renderer.append(content))

  // NOT OK: Response status was outside 200-399
  const error = `Server returned a ${response.status} status code! TurboBoost Commands require 2XX-3XX status codes.`
  dispatch(lifecycle.events.clientError, document, { detail: { error, response } }, true)
  if (append) response.text().then(text => renderer.append(text))
}

const invoke = (payload = {}) => {
  try {
    fetch(urls.commandInvocationURL.href, {
      method: 'POST',
      headers: headers.prepare({}),
      body: JSON.stringify(payload)
    })
      .then(parseResponse)
      .catch(parseError)
  } catch (error) {
    parseError(error)
  }
}

export { invoke }
