import { onMount, getDisplayName } from '@launchpadlab/lp-utils'

function displayWarning (warning) {
  // eslint-disable-next-line no-console
  console.warn(`DEPRECATION: ${warning}`)
}

function defaultMessage (component) {
  return `${getDisplayName(component)} is deprecated and will be removed in the next version of lp-utils.`
}

export default function (message) {
  return function (wrappedComponent) {
    const warning = message || defaultMessage(wrappedComponent)
    return onMount(() => displayWarning(warning))(wrappedComponent)
  }
}
