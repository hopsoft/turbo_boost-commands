function build (urlString) {
  const a = document.createElement('a')
  a.href = urlString
  return new URL(a)
}

export { build }
