import React from 'react'
import { wrapDisplayName } from 'recompose'
import { intersection } from 'lodash'

// Return array of keys that appear in both objects
function sharedKeys(objA, objB) {
  return intersection(Object.keys(objA), Object.keys(objB))
}

// Display warning(s) when unpacked props have the same name as passed ones
function checkShadowedProps(oldProps, newProps) {
  const shadowedProps = sharedKeys(oldProps, newProps)
  shadowedProps.forEach((shadowedProp) =>
    // eslint-disable-next-line no-console
    console.warn(
      `Prop "${shadowedProp}" is shadowed by a redux-form prop and will be overridden. 
      Consider changing the name of this prop.`
    )
  )
}

// Destructure special "input" and "meta" props
function unpackReduxFormProps(props) {
  const { input = {}, meta = {}, ...oldProps } = props
  const unpackedProps = { ...input, ...meta }
  checkShadowedProps(oldProps, unpackedProps)
  return { ...oldProps, ...unpackedProps }
}

// Adapt form components to accept redux form props
function reduxFormAdapter(Component) {
  function Wrapper(props) {
    // TODO rearrange onchange args, blur dirty
    return <Component {...unpackReduxFormProps(props)} />
  }
  Wrapper.displayName = wrapDisplayName(Component, 'reduxFormAdapter')
  return Wrapper
}

export default reduxFormAdapter
