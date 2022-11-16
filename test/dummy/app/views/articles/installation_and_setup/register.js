// The following adds the `dblclick` event delegate for `aside` elements
// This means that all `aside` elements which define a `data-turbo-reflex` attribute will trigger a reflex.
TurboReflex.registerEventDelegate('dblclick', ['aside[data-turbo-reflex]'])
//                                    |           |
//                                    |           |- array of css selectors
//                                    |
//                                    |- event name

// The following overrides the `click` event delegate with new selectors
TurboReflex.registerEventDelegate('click', [
  'a[data-turbo-reflex]',
  'button[data-turbo-reflex]'
])

// The following appends a new selector to the `dblclick` event delegate registered above
TurboReflex.registerEventDelegate('dblclick', [
  ...TurboReflex.eventDelegates.dblclick,
  'section[data-turbo-reflex]'
])
