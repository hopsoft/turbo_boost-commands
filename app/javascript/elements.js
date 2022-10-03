import schema from './schema.js'
import lifecycle from './lifecycle'

function findClosestReflex (element) {
  return element.closest(`[${schema.reflexAttribute}]`)
}

function findClosestFrame (element) {
  return element.closest('turbo-frame')
}

function assignElementValueToPayload (element, payload = {}) {
  if (element.tagName.toLowerCase() !== 'select')
    return (payload.value = element.value)

  if (!element.multiple)
    return (payload.value = element.options[element.selectedIndex].value)

  payload.values = Array.from(element.options).reduce((memo, option) => {
    if (option.selected) memo.push(option.value)
    return memo
  }, [])
}

function buildAttributePayload (element) {
  // truncate long values to optimize payload size
  // TODO: revisit this decision
  const maxAttributeLength = 100
  const maxValueLength = 500

  const payload = Array.from(element.attributes).reduce((memo, attr) => {
    let value = attr.value
    if (typeof value === 'string' && value.length > maxAttributeLength)
      value = value.slice(0, maxAttributeLength) + '...'
    memo[attr.name] = value
    return memo
  }, {})

  payload.tag = element.tagName
  payload.checked = element.checked
  payload.disabled = element.disabled
  assignElementValueToPayload(element, payload)

  if (
    typeof payload.value === 'string' &&
    payload.value.length > maxValueLength
  )
    payload.value = payload.value.slice(0, maxValueLength) + '...'

  delete payload.class
  delete payload[schema.reflexAttribute]
  delete payload[schema.frameAttribute]
  return payload
}

export default {
  buildAttributePayload,
  findClosestReflex,
  findClosestFrame,
  get metaElement () {
    return document.getElementById('turbo-reflex')
  },
  get metaElementToken () {
    return document.getElementById('turbo-reflex').getAttribute('content')
  }
}
