addEventListener(TurboReflex.events.start, event => {
  event.target.classList.add('animate-pulse')
  event.target.disabled = true
  document.body.classList.add('busy')
})

addEventListener(TurboReflex.events.finish, event => {
  if (event.target.nodeType === Node.ELEMENT_NODE)
    event.target.classList.remove('animate-pulse')
  document.body.classList.remove('busy')
})
