import React, { PropTypes } from 'react'
import classnames from 'classnames'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypes,
  ...InputError.propTypes,
  ...InputLabel.propTypes,
  label: PropTypes.node.isRequired,
}

function Checkbox ({
  input: { name, value, onBlur, onChange },
  meta: { error, touched, invalid },
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
        { ...{ name, value, onBlur, onChange, ...rest } }
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
