import activity from './activity'
import { dispatch, commandEvents } from './events'

function finish(event) {
  setTimeout(() => dispatch(commandEvents.finish, event.target, { detail: event.detail }))
}

addEventListener(commandEvents.abort, finish)
addEventListener(commandEvents.serverError, finish)
addEventListener(commandEvents.success, finish)
addEventListener(commandEvents.finish, event => activity.remove(event.detail.id), true)

export default { events: commandEvents }
