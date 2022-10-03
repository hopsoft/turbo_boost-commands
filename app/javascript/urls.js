function build (urlString, payload = {}) {
  const a = document.createElement('a')
  a.href = urlString
  const url = new URL(a)
  url.searchParams.set('turbo_reflex', JSON.stringify(payload))
  return url
}

export default { build }
