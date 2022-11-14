// Importing exposes `Turbo` on window
import '@hotwired/turbo-rails'

import TurboReady from 'turbo_ready'
TurboReady.initialize(Turbo.StreamActions)

// Importing exposes `TurboReflex` on window
import 'turbo_reflex'

// Supported log levels
//
// * debug - log everything
// * info - log everything
// * warn - log aborts, errors, and warnings
// * error - log errors
// * unknown - log nothing
//
TurboReflex.logger.level = 'debug'
