const append = content => {
  document.body.insertAdjacentHTML('beforeend', content)
}

// TODO: Revisit the "Replace" strategy after morph ships with Turbo 8
const replace = content => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  document.head.innerHTML = doc.head.innerHTML
  document.body.innerHTML = doc.body.innerHTML
}

export const render = (strategy, content) => {
  if (strategy.match(/^Append$/i)) return append(content)
  if (strategy.match(/^Replace$/i)) return replace(content)
}

export default { render }
