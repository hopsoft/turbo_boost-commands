addEventListener(TurboReflex.events.start, event => {
  event.target.classList.add('animate-pulse')
  document.body.classList.add('busy')
})

addEventListener(TurboReflex.events.finish, event => {
  document.body.classList.remove('busy')
})
