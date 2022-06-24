import { get, isServer } from '../../../../utils'

// Attempts to retrieve an environment variable from process.env 
function getEnvVar (varName) {
  // On the server, retrieve vars from process
  // eslint-disable-next-line no-undef
  if (isServer()) return get(`env.${ varName }`, process)
  // Otherwise, retrieve vars from window.process
  // eslint-disable-next-line no-undef
  return get(`process.env.${ varName }`, window)
}

export default getEnvVar