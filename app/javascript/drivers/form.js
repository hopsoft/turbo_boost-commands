import meta from '../meta'

function updateFormSubmission(formSubmission) {
  const shouldUpdate =
    formSubmission?.body instanceof URLSearchParams &&
    formSubmission?.fetchRequest?.body instanceof URLSearchParams

  if (!shouldUpdate) return

  formSubmission.formData = new FormData(formSubmission.formElement)
  for (const [key, value] of formSubmission.formData.entries()) {
    formSubmission.fetchRequest.body.set(key, value)
    formSubmission.body.set(key, value)
  }

  return formSubmission
}

function invokeCommand(form, payload = {}, event = {}) {
  payload.token = meta.token
  const input = form.querySelector('input[name="turbo_boost_command"]') || document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_boost_command'
  input.value = JSON.stringify(payload)
  form.appendChild(input)
  updateFormSubmission(event.detail.formSubmission)
}

export default { invokeCommand }
