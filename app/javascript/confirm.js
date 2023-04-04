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
    new Promise((resolve, reject) => {
      if (confirmMethod(message)) return resolve()
      reject('The user cancelled the command.')
    })
  )
}

setConfirmMethod(message => confirm(message))
document.addEventListener(commandEvents.start, showConfirm)
