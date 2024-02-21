import { Application } from '@hotwired/stimulus'

const application = Application.start()

import ScrollIntoViewController from './controllers/scroll_into_view_controller'
application.register('scroll-into-view', ScrollIntoViewController)

import StateController from './controllers/state_controller'
application.register('state', StateController)

import ViewModeController from './controllers/view_mode_controller'
application.register('view-mode', ViewModeController)
