import React, { PropTypes } from 'react'
import classnames from 'classnames'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypes,
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  type: PropTypes.string,
}

const defaultProps = {
  type: 'text',
}

function Input ({
  input: { name, value, onBlur, onChange },
  meta: { error, touched, invalid },
  className,
  hint,
  label,
  tooltip,
  type,
  ...rest
}) {
  return (
    <fieldset className={ classes({ className, touched, invalid }) }>
      <InputLabel { ...{ hint, label, name, tooltip } } />
      <input { ...{ id: name, name, type, value, onBlur, onChange, ...rest } }/>
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