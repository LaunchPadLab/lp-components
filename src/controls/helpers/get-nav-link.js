// Return nav link using paths or full url if full link is provided

function getNavLink(baseURL, path) {
  if (path.startsWith('http')) return path
  return `${baseURL}/${path}`
}

export default getNavLink
