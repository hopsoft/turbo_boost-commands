const buildURL = path => {
  const a = document.createElement('a')
  a.href = path
  return new URL(a)
}

export default {
  get commandInvocationURL() {
    return buildURL('/turbo-boost/command/invocation')
  }
}
