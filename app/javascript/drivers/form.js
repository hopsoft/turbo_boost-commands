import meta from '../meta'

function invokeReflex (form, payload = {}) {
  payload.token = meta.token
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_reflex'
  input.value = JSON.stringify(payload)
  form.appendChild(input)
}

export default { invokeReflex }
