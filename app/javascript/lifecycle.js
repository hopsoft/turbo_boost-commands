import activity from './activity'
import { dispatch, lifecycleEvents as events } from './events'

function finish (event) {
  event.detail.endedAt = new Date().getTime()
  event.detail.milliseconds = event.detail.endedAt - event.detail.startedAt
  setTimeout(
    () => dispatch(events.finish, event.target, { detail: event.detail }),
    25
  )
}

addEventListener(events.serverError, finish)
addEventListener(events.success, finish)
addEventListener(events.finish, event => activity.remove(event.detail.id), true)

export default { events }
