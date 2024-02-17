const commandPath = '/turbo-boost/command'

const commandURL = () => {
  const a = document.createElement('a')
  a.href = commandPath
  return new URL(a)
}

export default {
  get command() {
    return commandURL()
  }
}
