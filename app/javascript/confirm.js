import { commandEvents } from './events'

// what to do if form driver? let rails/hotwire handle it?

let confirmMethod

export function setConfirmMethod (method) {
  confirmMethod = method
}

function showConfirm (event) {
  const element = event.target.closest('[data-turbo-command]')
  const { turboConfirm: message } = element.dataset
  if (!message) return

  event.detail.promises.push(
    new Promise((resolve, _reject) =>
      resolve({
        method: 'TurboBoost.Commands.confirmMethod',
        result: confirmMethod(message)
      })
    )
  )
}

setConfirmMethod(message => confirm(message))
//setConfirmMethod(message => {
//throw 'Nate said it fails!'
//})
document.addEventListener(commandEvents.start, showConfirm, true)
