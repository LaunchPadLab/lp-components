import { onMount } from '@launchpadlab/lp-utils'

function displayWarning (warning) {
  // eslint-disable-next-line no-console
  console.warn(`DEPRECATION: ${warning}`)
}

export default function (warning) {
  if (!warning || typeof warning !== 'string') throw 'Must include deprecation warning.'
  return function (wrappedComponent) {
    return onMount(() => displayWarning(warning))(wrappedComponent)
  }
}
