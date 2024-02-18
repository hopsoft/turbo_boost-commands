const append = content => {
  document.body.insertAdjacentHTML('beforeend', content)
}

const replace = content => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  document.head.innerHTML = doc.head.innerHTML
  document.body.innerHTML = doc.body.innerHTML
}

export default { append, replace }
