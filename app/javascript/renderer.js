const append = content => {
  document.body.insertAdjacentHTML('beforeend', content)
}

const replace = content => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  const head = document.querySelector('head')
  const body = document.querySelector('body')
  const newHead = doc.querySelector('head')
  const newBody = doc.querySelector('body')
  if (head && newHead) TurboBoost?.Streams?.morph?.method(head, newHead)
  if (body && newBody) TurboBoost?.Streams?.morph?.method(body, newBody)
}

// TODO: dispatch events after append/replace so we can apply page state
export const render = (strategy, content) => {
  if (strategy && content) {
    if (strategy.match(/^Append$/i)) return append(content)
    if (strategy.match(/^Replace$/i)) return replace(content)
  }
}

export default { render }
