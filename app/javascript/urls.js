function build(urlString, payload = {}) {
  const a = document.createElement('a')
  a.href = urlString
  const url = new URL(a)
  url.searchParams.set('tbc', JSON.stringify(payload))
  return url
}

export default { build }
