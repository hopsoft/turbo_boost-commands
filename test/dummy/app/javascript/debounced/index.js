import debounced from 'debounced'

debounced.initialize({
  ...debounced.events,
  'turbo:load': { wait: 150 },
  'turbo-boost:command:success': { wait: 150 },
  'turbo-boost:command:finish': { wait: 150 }
})
