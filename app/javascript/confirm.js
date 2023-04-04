import { commandEvents } from './events'

let confirmMethod

export function setConfirmMethod (method) {
  confirmMethod = method
}

function showConfirm (event) {
  // TODO: investigate further
  // return early if event.driver is a native Turbo thing that supports confirm

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
document.addEventListener(commandEvents.start, showConfirm, true)
