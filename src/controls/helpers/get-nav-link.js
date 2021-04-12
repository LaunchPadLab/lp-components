// Return nav link using paths or full url if full link is provided

function getNavLink(baseUrl, path) {
  if (path.startsWith('http')) return path
  return `${baseUrl}/${path}`
}

export default getNavLink
