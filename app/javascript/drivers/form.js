import meta from '../meta'

function invokeCommand (form, payload = {}) {
  payload.token = meta.token
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_boost_command'
  input.value = JSON.stringify(payload)
  form.appendChild(input)
}

export default { invokeCommand }
