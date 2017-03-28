import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { fieldPropTypesWithValue } from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypesWithValue(PropTypes.bool),
  ...InputError.propTypes,
  ...InputLabel.propTypes,
  label: PropTypes.node,
}

function Checkbox ({
  input: { name, value, onBlur, onChange },
  meta: { error, pristine, touched, invalid },
  hint,
  label,
  tooltip,
  ...rest
}) {
  return (
    <fieldset className={ classes({ touched, invalid }) }>

      <input
        id={ name }
        type="checkbox"
        checked={value}
        onBlur={ pristine ? null : onBlur } 
        onChange={ () => onChange(!value) }
        { ...{ name, value, ...rest } }
      />

      <InputLabel { ...{ hint, label, name, tooltip } } />

      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
}

function classes ({ touched, invalid }) {
  return classnames(
    'checkbox',
    { error: touched && invalid }
  )
}

Checkbox.propTypes = propTypes

export default Checkbox
