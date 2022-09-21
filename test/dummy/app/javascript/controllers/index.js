import { Application } from '@hotwired/stimulus'

const application = Application.start()

//import DrawerController from './controllers/drawer_controller'
//application.register('drawer', DrawerController)

import ViewModeController from './controllers/view_mode_controller'
application.register('view-mode', ViewModeController)
