import elements from '../elements'
import formDriver from './form'
import frameDriver from './frame'
import methodDriver from './method'
import windowDriver from './window'

function src (element, frame) {
  frame = frame || { dataset: {} }
  return (
    element.href || frame.src || frame.dataset.turboReflexSrc || location.href
  )
}

function find (element) {
  let frame = elements.findClosestFrame(element)
  const { turboFrame, turboMethod } = element.dataset

  if (element.tagName.toLowerCase() === 'form')
    return {
      name: 'form',
      reason: 'Element is a form.',
      frame,
      src: element.action,
      invokeReflex: formDriver.invokeReflex
    }

  if (turboMethod && turboMethod.length > 0)
    return {
      name: 'method',
      reason: 'Element defines data-turbo-method.',
      frame,
      src: element.href,
      invokeReflex: methodDriver.invokeReflex
    }

  // element targets a frame that is not _self
  if (turboFrame && turboFrame !== '_self') {
    frame = document.getElementById(turboFrame)
    return {
      name: 'frame',
      reason: 'element targets a frame that is not _self',
      frame,
      src: src(element, frame),
      invokeReflex: frameDriver.invokeReflex
    }
  }

  // element does NOT target a frame or targets _self and is contained by a frame
  if ((!turboFrame || turboFrame === '_self') && frame)
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
