function save(name, value) {
  if (typeof value !== 'object') value = {}
  return sessionStorage.setItem(String(name), JSON.stringify(value))
}

function find(name) {
  const stored = sessionStorage.getItem(String(name))
  return stored ? JSON.parse(stored) : {}
}

export default { save, find }
