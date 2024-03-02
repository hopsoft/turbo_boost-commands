import uuids from './uuids'

const append = content => {
  document.body.insertAdjacentHTML('beforeend', content)
}

const replace = content => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  TurboBoost.Streams.morph.method(document.documentElement, doc.documentElement)
}

export const render = (strategy, content) => {
  if (!strategy) return console.warn('TurboBoost::Commands unable to render! (strategy not defined)')
  if (!content) return console.warn('TurboBoost::Commands unable to render! (content not defined)')
  if (strategy.match(/^Append$/i)) return append(content)
  if (strategy.match(/^Replace$/i)) return replace(content)
}

export default { render }
