import React, { PropTypes } from 'react'
import MaskedInput from 'react-input-mask'
import classnames from 'classnames'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypes,
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  type: PropTypes.string,
  mask: PropTypes.string,
  showMaskPlaceholder: PropTypes.bool
}

const defaultProps = {
  type: 'text',
}

function Input ({
  input: { name, value, onBlur, onChange },
  meta: { error, pristine, touched, invalid },
  className,
  hint,
  label,
  tooltip,
  type,
  mask,
  showMaskPlaceholder,
  ...rest
}) {
  return (
    <fieldset className={ classes({ className, touched, invalid }) }>
      <InputLabel { ...{ hint, label, name, tooltip } } />
      <MaskedInput 
        mask={mask}
        maskChar={ showMaskPlaceholder ? '_' : null }
        onBlur={ pristine ? null : onBlur } 
        { ...{ id: name, name, type, value, onChange, ...rest } }
      />
      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
}

function classes ({ className, touched, invalid }) {
  return classnames(className, { error: touched && invalid })
}

Input.defaultProps = defaultProps
Input.propTypes = propTypes

export default Input