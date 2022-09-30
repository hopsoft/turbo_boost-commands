const active = {}

function add (payload) {
  active[payload.id] = payload
}

function remove (id) {
  delete active[id]
}

export default {
  add,
  remove,
  get reflexes () {
    return [...Object.values(active)]
  },
  get length () {
    return Object.keys(active).length
  }
}
