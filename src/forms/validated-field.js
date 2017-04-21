import React from 'react'
import classnames from 'classnames'
import { getDisplayName } from '../utils'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypes,
  ...InputLabel.propTypes,
  ...InputError.propTypes,
}

function classes ({ className, touched, invalid }) {
  return classnames(className, { 'error': touched && invalid })
}

// A function that returns an HOC that adds a label and an error field to an input

function validatedField () {
  return function (WrappedComponent) {
    function Wrapper (props) {
      const {
        input: { name },
        meta: { error, touched, invalid },
        className,
        hint,
        label,
        tooltip,
      } = props
      return (
        <fieldset className={ classes({ className, touched, invalid }) }>
          <InputLabel { ...{ hint, label, name, tooltip } } />
            <WrappedComponent { ...props } />
          <InputError { ...{ error, invalid, touched } } />
        </fieldset>
      )
    }
    Wrapper.propTypes = propTypes
    Wrapper.displayName = `Validated${getDisplayName(WrappedComponent)}`
    return Wrapper
  }
}

export default validatedField