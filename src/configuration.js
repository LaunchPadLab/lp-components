// Adapter pattern lifted from enzyme:
// https://github.com/airbnb/enzyme/blob/master/packages/enzyme/src/configuration.js

let configuration = {
  formAdapter: null,
}

// Retrieve global configuration (internal)
export function getConfiguration() {
  return configuration
}

// Modify global configuration (external)
export function configure(options = {}) {
  configuration = {
    ...configuration,
    ...options,
  }
  return configuration
}

export default configure
