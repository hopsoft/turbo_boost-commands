import { Application } from '@hotwired/stimulus'

const application = Application.start()

import ViewModeController from './controllers/view_mode_controller'
application.register('view-mode', ViewModeController)

import OpenerController from './controllers/opener_controller'
application.register('opener', OpenerController)
