addEventListener(TurboReflex.events.start, event => {
  event.target.classList.add('animate-bounce')
  document.body.classList.add('busy')
})

addEventListener(TurboReflex.events.finish, event => {
  if (event.target.nodeType === Node.ELEMENT_NODE)
    event.target.classList.remove('animate-bounce')
  document.body.classList.remove('busy')
})
