import urls from '../urls'

function invokeReflex (element, payload = {}) {
  const src = payload.src
  payload = { ...payload }
  delete payload.src
  delete payload.href
  element.setAttribute('href', urls.build(src, payload))
}

export default { invokeReflex }
