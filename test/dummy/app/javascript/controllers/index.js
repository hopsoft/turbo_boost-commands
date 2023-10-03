import { Application, Controller } from '@hotwired/stimulus'
import '@turbo-boost/commands'

const application = Application.start()

// TODO: consider moving registration into the library
application.register('turbo-boost-command', TurboBoost.Commands.createCommandController(Controller))

import ScrollIntoViewController from './controllers/scroll_into_view_controller'
application.register('scroll-into-view', ScrollIntoViewController)

import ViewModeController from './controllers/view_mode_controller'
application.register('view-mode', ViewModeController)
