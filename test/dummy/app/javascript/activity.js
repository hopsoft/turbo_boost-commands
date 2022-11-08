addEventListener(TurboReflex.events.start, event => {
  const element = event.target
  element.dataset.disabled = element.disabled
  element.classList.add('animate-pulse')
  element.disabled = true
  document.body.classList.add('busy')
})

addEventListener(TurboReflex.events.finish, event => {
  const element = event.target
  if (element.nodeType === Node.ELEMENT_NODE) {
    element.classList.remove('animate-pulse')
    element.disabled = element.dataset.disabled
    delete element.dataset.disabled
  }
  document.body.classList.remove('busy')
})
