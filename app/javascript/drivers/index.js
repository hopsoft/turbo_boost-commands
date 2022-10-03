import elements from '../elements'
import formDriver from './form'
import frameDriver from './frame'
import windowDriver from './window'

function src (element, frame) {
  frame = frame || { dataset: {} }
  return (
    element.href || frame.src || frame.dataset.turboReflexSrc || location.href
  )
}

function find (element) {
  let frame = elements.findClosestFrame(element)
  const targetId = element.dataset.turboFrame

  if (element.tagName.toLowerCase() === 'form')
    return {
      name: 'form',
      reason: 'Element is a form.',
      frame,
      src: element.action,
      invokeReflex: formDriver.invokeReflex
    }

  // element targets a frame that is not _self
  if (targetId && targetId !== '_self') {
    frame = document.getElementById(targetId)
    return {
      name: 'frame',
      reason: 'element targets a frame that is not _self',
      frame,
      src: src(element, frame),
      invokeReflex: frameDriver.invokeReflex
    }
  }

  // element does NOT target a frame or targets _self and is contained by a frame
  if ((!targetId || targetId === '_self') && frame)
    return {
      name: 'frame',
      reason:
        'element does NOT target a frame or targets _self and is contained by a frame',
      frame,
      src: src(element, frame),
      invokeReflex: frameDriver.invokeReflex
    }

  // element matches one or more of the following conditions
  // - targets _top
  // - does NOT target a frame
  // - is NOT contained by a frame
  return {
    name: 'window',
    reason:
      'element matches one or more of the following conditions (targets _top, does NOT target a frame, is NOT contained by a frame)',
    frame: null,
    src: src(element),
    invokeReflex: windowDriver.invokeReflex
  }
}

export default { find }
