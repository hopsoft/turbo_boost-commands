import urls from '../urls'
import elements from '../elements'

function invokeReflex (frame, payload) {
  const src = elements.findFrameSrc(frame, payload)
  if (!src) return
  frame.src = urls.build(src, payload)
}

export default { invokeReflex }
