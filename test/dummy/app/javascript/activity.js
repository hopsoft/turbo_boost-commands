const delay = 250
let activity
let activeNode

function showActivity () {
  activeNode.dataset.disabled = activeNode.disabled
  activeNode.classList.add('animate-bounce')
  activeNode.disabled = true
  document.body.classList.add('busy')
}

function hideActivity () {
  if (activeNode.nodeType === Node.ELEMENT_NODE) {
    activeNode.classList.remove('animate-bounce')
    activeNode.disabled = activeNode.dataset.disabled
    delete activeNode.dataset.disabled
  }
  document.body.classList.remove('busy')
}

addEventListener(TurboReflex.events.start, event => {
  activeNode = event.target
  clearTimeout(activity)
  activity = setTimeout(showActivity, delay)
})

addEventListener(TurboReflex.events.finish, event => {
  activeNode = event.target
  clearTimeout(activity)
  hideActivity()
})
