import activity from './activity'
import { dispatch, commandEvents } from './events'

function finish(event) {
  event.detail.endedAt = Date.now()
  event.detail.milliseconds = event.detail.endedAt - event.detail.startedAt
  setTimeout(() => dispatch(commandEvents.finish, event.target, { detail: event.detail }), 25)
}

// TODO: forward source event to finish (error or success)
addEventListener(commandEvents.serverError, finish)
addEventListener(commandEvents.success, finish)
addEventListener(commandEvents.finish, event => activity.remove(event.detail.id), true)

export default { events: commandEvents }
