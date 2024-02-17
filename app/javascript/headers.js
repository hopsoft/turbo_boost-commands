const types = {
  boost: 'text/vnd.turbo-boost.html',
  stream: 'text/vnd.turbo-stream.html',
  html: 'text/html',
  xhtml: 'application/xhtml+xml',
  json: 'application/json'
}

const prepare = (headers = {}) => {
  headers = { ...headers }

  // Assign Accept values
  const accepts = (headers['Accept'] || '').split(',').map(val => val.trim())
  accepts.unshift(types.boost, types.stream, types.html, types.xhtml)
  headers['Accept'] = [...new Set(accepts)].join(', ')

  // Assign Content-Type (Commands POST JSON via fetch/XHR)
  headers['Content-Type'] = types.json

  // Assign X-Requested-With for XHR detection
  headers['X-Requested-With'] = 'XMLHttpRequest'

  return headers
}

export default { prepare }
