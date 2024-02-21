let activeElement
let activePayload

const reset = () => {
  activeElement = null
  activePayload = null
}

const invokeCommand = (element, payload = {}) => {
  activeElement = element
  activePayload = payload
}

const amendForm = form => {
  try {
    if (!activeElement) return
    if (form.getAttribute('method') !== activeElement.dataset.turboMethod) return
    if (form.getAttribute('action') !== activeElement.href) return

    const input = form.querySelector('input[name="turbo_boost_command"]') || document.createElement('input')
    input.type = 'hidden'
    input.name = 'turbo_boost_command'
    input.value = JSON.stringify(activePayload)
    if (!form.contains(input)) form.appendChild(input)
  } finally {
    reset() // ensure reset
  }
}

document.addEventListener('submit', event => amendForm(event.target), true)

export default { invokeCommand }
