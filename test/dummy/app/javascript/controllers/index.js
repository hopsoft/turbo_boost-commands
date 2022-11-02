import { Application } from '@hotwired/stimulus'

const application = Application.start()

import ScrollIntoViewController from './controllers/scroll_into_view_controller'
application.register('scroll-into-view', ScrollIntoViewController)

import ViewModeController from './controllers/view_mode_controller'
application.register('view-mode', ViewModeController)
