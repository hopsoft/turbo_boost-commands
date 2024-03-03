import '@turbo-boost/streams'
import '@turbo-boost/commands'

TurboBoost.Commands.logger.level = 'debug'

TurboBoost.Commands.registerEventDelegate('toggle', [
  'details[data-turbo-command="RememberAttributesCommand"]'
])
