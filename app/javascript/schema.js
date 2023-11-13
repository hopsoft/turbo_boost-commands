const schema = {
  // attributes
  frameAttribute: 'data-turbo-frame',
  methodAttribute: 'data-turbo-method',
  commandAttribute: 'data-turbo-command',
  confirmAttribute: 'data-turbo-confirm',

  // events
  turboSubmitStartEvent: 'turbo:submit-start'
}

export default { ...schema }
