import urls from '../urls'
import elements from '../elements'

function invokeReflex (frame, payload) {
  const src = payload.src
  payload = { ...payload }
  delete payload.src
  frame.src = urls.build(src, payload)
}

export default { invokeReflex }
