import elements from '../elements'

function invokeReflex (form, payload = {}) {
  payload.token = elements.metaElementToken
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_reflex'
  input.value = JSON.stringify(payload)
  form.appendChild(input)
}

export default { invokeReflex }
