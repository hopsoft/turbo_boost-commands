import { commandEvents } from './events'

function showConfirm(event) {
  let defaultConfirm = document.activeElement.dataset.confirm
  let turboConfirm = document.activeElement.dataset.turboConfirm

  if (defaultConfirm) {
    if (!confirm(defaultConfirm)) event.preventDefault()
  }

  if (turboConfirm) {
  }

}

document.addEventListener(commandEvents.start, showConfirm)