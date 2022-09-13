import LifecycleEvents from './lifecycle_events'

function findClosestReflex (element) {
  return element.closest('[data-turbo-reflex]')
}

function findClosestFrame (element) {
  return element.closest('turbo-frame')
}

function findFrameId (element) {
  let id = element.dataset.turboReflexFrame || element.dataset.turboFrame
  if (!id) {
    const frame = findClosestFrame(element)
    if (frame) id = frame.id
  }
  if (!id) {
    console.error(
      `The reflex element does not specify a frame!`,
      `Please move the reflex element inside a <turbo-frame> or set the 'data-turbo-reflex-frame' or 'data-turbo-frame' attribute.`,
      element
    )
    LifecycleEvents.dispatch(LifecycleEvents.missingFrameId, element, {
      element
    })
  }
  return id
}

function findFrame (id) {
  const frame = document.getElementById(id)
  if (!frame) {
    console.error(`The frame '${id}' does not exist!`)
    LifecycleEvents.dispatch(LifecycleEvents.missingFrame, document, { id })
  }
  return frame
}

function findFrameSrc (frame) {
  const frameSrc = frame.dataset.turboReflexSrc || frame.src
  if (!frameSrc) {
    console.error(
      `The the 'src' for <turbo-frame id='${frame.id}'> is unknown!`,
      `TurboReflex uses 'src' to (re)render frame content after the reflex is invoked.`,
      `Please set the 'src' or 'data-turbo-reflex-src' attribute on the <turbo-frame> element.`,
      frame
    )
    LifecycleEvents.dispatch(LifecycleEvents.missingFrameSrc, frame, { frame })
  }
  return frameSrc
}

function buildAttributePayload (element) {
  const { tagName, value } = element
  const tag = tagName.toLowerCase()
  const payload = Array.from(element.attributes).reduce((memo, attr) => {
    memo[attr.name] = attr.value
    return memo
  }, {})

  payload.tagName = tagName
  payload.value = value || null

  if (tag === 'select') {
    if (element.multiple) {
      payload.values = Array.from(element.options).reduce((memo, option) => {
        if (option.selected) memo.push(option.value)
        return memo
      }, [])
    } else {
      payload.value = element.options[element.selectedIndex].value
    }
  }

  if (tag === 'input' && element.type === 'checkbox')
    payload.checked = !!element.checked

  return payload
}

export {
  findClosestReflex,
  findClosestFrame,
  findFrameId,
  findFrame,
  findFrameSrc,
  buildAttributePayload
}
