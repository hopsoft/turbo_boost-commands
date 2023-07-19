import { commandEvents } from './events'
import schema from './schema'

const confirmation = {
  method: message => Promise.resolve(confirm(message))
}

document.addEventListener(commandEvents.start, async event => {
  const message = event.target.getAttribute(schema.confirmAttribute)
  if (message) {
    const confirmed = await confirmation.method(message)
    if (!confirmed) event.preventDefault()
  }
})

export default confirmation
