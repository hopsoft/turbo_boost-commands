import activity from './activity'
import { dispatch, commandEvents } from './events'

function finish(event) {
  setTimeout(() => dispatch(commandEvents.finish, event.target, { detail: event.detail }))
}

const events = [commandEvents.abort, commandEvents.serverError, commandEvents.success]
events.forEach(name => addEventListener(name, finish))
addEventListener(commandEvents.finish, event => activity.remove(event.detail.id), true)

export default { events: commandEvents }
