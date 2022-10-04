function renderDocument (content) {
  const head = '<html'
  const tail = '</html'
  const headIndex = content.indexOf(head)
  const tailIndex = content.lastIndexOf(tail)
  if (headIndex >= 0 && tailIndex >= 0) {
    const html = content.slice(content.indexOf('>', headIndex) + 1, tailIndex)
    document.documentElement.innerHTML = html
  }
}

function renderStreams (content) {
  const head = '<turbo-stream'
  const tail = '</turbo-stream>'
  const headIndex = content.indexOf(head)
  const tailIndex = content.lastIndexOf(tail)
  if (headIndex >= 0 && tailIndex >= 0) {
    const streams = content.slice(headIndex, tailIndex + tail.length)
    document.body.insertAdjacentHTML('beforeend', streams)
  }
}

export default { renderDocument, renderStreams }
