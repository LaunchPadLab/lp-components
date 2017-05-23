import React from 'react'
import { getDisplayName } from '../../utils'

// A function that returns an HOC to wrap an input -
// nullifies the onBlur if the input is pristine
/* eslint react/prop-types: off */

function BlurDirty () {
  return function (WrappedComponent) {
    function Wrapper (props) {
      const { 
        input,
        meta
      } = props
      const onBlur = meta.pristine ? null : input.onBlur
      return (
        <WrappedComponent { ...{ ...props, input: { ...input, onBlur } } } />
      )
    }
    Wrapper.displayName = `BlurDirty${getDisplayName(WrappedComponent)}`
    return Wrapper
  }
}

export default BlurDirty