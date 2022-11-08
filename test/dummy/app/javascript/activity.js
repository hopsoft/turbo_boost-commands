addEventListener(TurboReflex.events.start, event => {
  document.body.classList.add('busy')
})

addEventListener(TurboReflex.events.finish, event => {
  document.body.classList.remove('busy')
})
