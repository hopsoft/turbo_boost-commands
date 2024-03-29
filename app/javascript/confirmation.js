import { commandEvents } from './events'
import schema from './schema'

const confirmation = {
  method: message => Promise.resolve(confirm(message))
}

const isTurboMethod = event => event.detail.driver === 'method'

const isTurboForm = event => {
  if (event.detail.driver !== 'form') return false

  const element = event.target
  const frame = element.closest('turbo-frame')
  const target = element.closest(`[${schema.frameAttribute}]`)
  return !!(frame || target)
}

const shouldDelegate = event => isTurboMethod(event) || isTurboForm(event)

document.addEventListener(commandEvents.start, async event => {
  const message = event.target.getAttribute(schema.confirmAttribute)
  if (!message) return

  event.detail.confirmation = true

  if (shouldDelegate(event)) return // delegate confirmation handling to Turbo

  const proceed = await confirmation.method(message)
  if (!proceed) event.preventDefault()
})

export default confirmation
