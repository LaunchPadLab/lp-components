import React from 'react'
import { getConfiguration } from '../../configuration'
import { wrapDisplayName } from 'recompose'
import { once } from 'lodash'

const adaptComponent = once((formAdapter, Component) => {
  // We'll trust that people know what they're doing here.
  return formAdapter ? formAdapter(Component) : Component
})

// Grab the global form adapter and apply it to the component
function applyFormAdapter(Component) {
  function Wrapper(props) {
    // Note: We have to do this at run time to make sure configuration loads post-import.
    // However, we also do it just once in the lifetime of the component.
    const { formAdapter } = getConfiguration()
    const WrappedComponent = adaptComponent(formAdapter, Component)
    return <WrappedComponent {...props} />
  }
  Wrapper.displayName = wrapDisplayName(Component, 'applyFormAdapter')
  return Wrapper
}

export default applyFormAdapter
