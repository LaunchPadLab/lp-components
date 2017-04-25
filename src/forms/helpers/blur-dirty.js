import React from 'react'
import { getDisplayName } from '../../utils'
import fieldPropTypes from './field-proptypes'

const propTypes = {
  ...fieldPropTypes
}

// A function that returns an HOC to wrap an input -
// nullifies the onBlur if the input is pristine

function BlurDirty () {
  return function (WrappedComponent) {
    function Wrapper (props) {
      const { input, meta } = props
      const onBlur = meta.pristine ? null : input.onBlur
      return (
        <WrappedComponent { ...{ ...props, input: { ...input, onBlur } } } />
      )
    }
    Wrapper.propTypes = propTypes
    Wrapper.displayName = `BlurDirty${getDisplayName(WrappedComponent)}`
    return Wrapper
  }
}

export default BlurDirty