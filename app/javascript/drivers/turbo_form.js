import meta from '../meta'

// TODO: why is this file here? we aren't using it anywhere.
function invokeCommand (form, payload = {}) {
  payload.token = meta.token
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_boost_command'
  input.value = JSON.stringify(payload)
  form.appendChild(input)

  const src = payload.src
  payload = { ...payload }
  delete payload.src
  frame.src = urls.build(src, payload)
}

export default { invokeCommand }
