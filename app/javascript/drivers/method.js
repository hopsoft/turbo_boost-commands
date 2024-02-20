let activeElement, activePayload

document.addEventListener(
  'submit',
  event => {
    try {
      const form = event.target
      const method = form.getAttribute('method')
      const action = form.getAttribute('action')

      if (method !== activeElement?.dataset?.turboMethod) return
      if (action !== activeElement?.href) return

      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = 'turbo_boost_command'
      input.value = JSON.stringify(activePayload)
      form.appendChild(input)
    } finally {
      activeElement = null
      activePayload = null
    }
  },
  true
)

function invokeCommand(element, payload = {}) {
  activeElement = element
  activePayload = payload
}

export default { invokeCommand }
