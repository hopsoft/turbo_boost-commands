import urls from '../urls'

function invokeReflex (frame, payload) {
  const src = payload.src
  payload = { ...payload }
  delete payload.src
  frame.src = urls.build(src, payload)
}

export default { invokeReflex }
