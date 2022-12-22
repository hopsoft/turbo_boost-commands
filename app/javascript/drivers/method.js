import urls from '../urls'

function invokeCommand (element, payload = {}) {
  const src = payload.src
  payload = { ...payload }
  delete payload.src
  delete payload.href
  element.setAttribute('href', urls.build(src, payload))
}

export default { invokeCommand }
