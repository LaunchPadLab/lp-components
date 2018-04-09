import React from 'react'

// We need this helper because Route components can't be rendered like normal components, 
// but we still want to test that the correct props are being passed down.

// So, this function simulates rendering a functional react component and returns the props that are passed to its child.

export function getChildProps (component, props={}) {
  // Mock createElement to return props
  const _createElement = React.createElement
  React.createElement = (_, props) => props
  // "Render" component by calling it as a function and return child props
  const childProps = component(props)
  // Reinstate createElement
  React.createElement = _createElement
  return childProps
}