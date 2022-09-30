import urls from '../urls'
import elements from '../elements'

function invokeReflex (frame, payload) {
  const src = elements.findFrameSrc(frame)
  if (!src) return
  const url = urls.build(src)
  url.searchParams.set('turbo_reflex', JSON.stringify(payload))
  frame.src = url.toString()
}

export default { invokeReflex }
