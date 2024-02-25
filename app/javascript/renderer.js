import uuids from './uuids'

// Morphs the element with the given HTML via the TurboBoost invoke <turbo-stream>
const morph = (selector, html) => {
  const stream = document.createElement('turbo-stream')
  stream.setAttribute('action', 'invoke')
  stream.setAttribute('target', 'DOM')

  const template = document.createElement('template')
  template.content.textContent = JSON.stringify({
    id: `morph-${uuids.v4()}`,
    selector,
    method: 'morph',
    args: [html],
    delay: 0
  })

  stream.appendChild(template)
  document.body.appendChild(stream)
}

const append = content => {
  document.body.insertAdjacentHTML('beforeend', content)
}

const replace = content => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  TurboBoost.Streams.morph(document.documentElement, doc.documentElement)
}

export const render = (strategy, content) => {
  if (strategy.match(/^Append$/i)) return append(content)
  if (strategy.match(/^Replace$/i)) return replace(content)
}

export default { render }
