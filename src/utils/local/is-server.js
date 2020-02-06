// Returns true when code is running in server mode

function isServer() {
  return typeof window === 'undefined'
}

export default isServer
