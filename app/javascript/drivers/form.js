const invokeCommand = (form, payload = {}) => {
  const input = form.querySelector('input[name="turbo_boost_command"]') || document.createElement('input')
  input.type = 'hidden'
  input.name = 'turbo_boost_command'
  input.value = JSON.stringify(payload)
  if (!form.contains(input)) form.appendChild(input)
}

export default { invokeCommand }
