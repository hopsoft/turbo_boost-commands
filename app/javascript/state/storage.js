function save(name, value) {
  if (typeof value !== 'object') value = {}
  return localStorage.setItem(String(name), JSON.stringify(value))
}

function find(name) {
  const stored = localStorage.getItem(String(name))
  return stored ? JSON.parse(stored) : {}
}

export default { save, find }
