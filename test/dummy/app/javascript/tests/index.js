const ttl = 200 // milliseconds

// Node monkey patches for tests..............................................................................
function setMutated(type) {
  clearTimeout(this._mutationsTimeout)
  this._mutations = this._mutations || new Set()
  this._mutations.add(type)
  this._mutationsTimeout = setTimeout(() => delete this._mutations, ttl)
}

function mutations() {
  let context = this
  while (context && !context._mutations) context = context.parentNode
  if (context?._mutations) return Array.from(context._mutations)
  return null
}

Node.prototype.setMutated = setMutated
HTMLElement.prototype.setMutated = setMutated
Object.defineProperty(Node.prototype, 'mutations', { get: mutations })
Object.defineProperty(HTMLElement.prototype, 'mutations', { get: mutations })

// MutationObserver to track mutations for tests..............................................................
function callback(mutations, observer) {
  mutations.forEach(mutation => {
    if (mutation.type === 'attributes') mutation.target.setMutated('attributes')
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach(node => node.setMutated('added'))
      mutation.removedNodes.forEach(node => node.setMutated('removed'))
    }
  })
}

new MutationObserver(callback).observe(document.documentElement, {
  attributes: true,
  attributeOldValue: false,
  childList: true,
  subtree: true
})

// Resets TurboBoost tracking.................................................................................
let turboBoostTimeout

self.addEventListener('turbo-boost:command:finish', () => {
  clearTimeout(turboBoostTimeout)
  turboBoostTimeout = setTimeout(
    () =>
      document.querySelectorAll('[data-turbo-boost]').forEach(el => el.removeAttribute('data-turbo-boost')),
    ttl
  )
})
