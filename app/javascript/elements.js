import schema from './schema'
import lifecycle from './lifecycle'

function findClosestCommand(element) {
  return element.closest(`[${schema.commandAttribute}]`)
}

function findClosestFrameWithSource(element) {
  return (
    element.closest('turbo-frame[src]') ||
    element.closest('turbo-frame[data-turbo-frame-src]') ||
    element.closest('turbo-frame')
  )
}

function assignElementValueToPayload(element, payload = {}) {
  if (element.tagName.toLowerCase() !== 'select') return (payload.value = element.value || null)

  if (!element.multiple) return (payload.value = element.options[element.selectedIndex].value)

  payload.values = Array.from(element.options).reduce((memo, option) => {
    if (option.selected) memo.push(option.value)
    return memo
  }, [])
}

function assignSerializedFormValuesToPayload(element, payload) {
  const serializeFormSelector = element.dataset.turboCommandSerializeForm
  if (!serializeFormSelector) return

  let serializableForm;

  if (serializeFormSelector === "true" || serializeFormSelector === "1") {
    serializableForm = element.closest("form");
  } else {
    serializableForm = document.createElement("form");
    document.querySelectorAll(serializeFormSelector).forEach((element) => {
      element.querySelectorAll("input, select, textarea").forEach((input) => {
        serializableForm.append(input.cloneNode(true))
      })
    })
  }

  const formData = new FormData(serializableForm)
  const serializedFormString = new URLSearchParams(formData).toString()
  payload['serialized-form'] = serializedFormString
}

function buildAttributePayload(element) {
  const payload = Array.from(element.attributes).reduce((memo, attr) => {
    let value = attr.value
    memo[attr.name] = value
    return memo
  }, {})

  payload.tag = element.tagName
  payload.checked = !!element.checked
  payload.disabled = !!element.disabled
  assignElementValueToPayload(element, payload)
  assignSerializedFormValuesToPayload(element, payload)

  // reduce payload size to keep URL length smaller
  delete payload.class
  delete payload.action
  delete payload.href
  delete payload[schema.commandAttribute]
  delete payload[schema.frameAttribute]

  return payload
}

export default {
  buildAttributePayload,
  findClosestCommand,
  findClosestFrameWithSource
}
