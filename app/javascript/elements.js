import schema from './schema'
import lifecycle from './lifecycle'

function findClosestReflex (element) {
  return element.closest(`[${schema.reflexAttribute}]`)
}

function findClosestFrame (element) {
  return element.closest('turbo-frame')
}

function assignElementValueToPayload (element, payload = {}) {
  if (element.tagName.toLowerCase() !== 'select')
    return (payload.value = element.value || null)

  if (!element.multiple)
    return (payload.value = element.options[element.selectedIndex].value)

  payload.values = Array.from(element.options).reduce((memo, option) => {
    if (option.selected) memo.push(option.value)
    return memo
  }, [])
}

function buildAttributePayload (element) {
  const payload = Array.from(element.attributes).reduce((memo, attr) => {
    let value = attr.value
    memo[attr.name] = value
    return memo
  }, {})

  payload.tag = element.tagName
  payload.checked = !!element.checked
  payload.disabled = !!element.disabled
  assignElementValueToPayload(element, payload)

  // reduce payload size to keep URL length smaller
  delete payload.class
  delete payload.action
  delete payload.href
  delete payload[schema.reflexAttribute]
  delete payload[schema.frameAttribute]

  return payload
}

export default {
  buildAttributePayload,
  findClosestReflex,
  findClosestFrame
}
