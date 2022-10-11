function replaceDocument (content) {
  const head = '<html'
  const tail = '</html'
  const headIndex = content.indexOf(head)
  const tailIndex = content.lastIndexOf(tail)
  if (headIndex >= 0 && tailIndex >= 0) {
    const html = content.slice(content.indexOf('>', headIndex) + 1, tailIndex)
    document.documentElement.innerHTML = html
  }
}

function append (content) {
  document.body.insertAdjacentHTML('beforeend', content)
}

export default { append, replaceDocument }
