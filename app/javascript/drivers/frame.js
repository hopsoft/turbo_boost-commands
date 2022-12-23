import urls from '../urls'

function invokeCommand (frame, payload) {
  const src = payload.src
  payload = { ...payload }
  delete payload.src
  frame.src = urls.build(src, payload)
}

export default { invokeCommand }
