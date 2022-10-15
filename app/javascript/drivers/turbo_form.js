import elements from '../elements'

function invokeReflex (form, payload = {}) {
  payload.token = elements.metaElementToken
  const input = document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_reflex'
  input.value = JSON.stringify(payload)
  form.appendChild(input)

  const src = payload.src
  payload = { ...payload }
  delete payload.src
  frame.src = urls.build(src, payload)
}

export default { invokeReflex }
