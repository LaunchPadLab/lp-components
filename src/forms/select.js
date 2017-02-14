import React, { PropTypes } from 'react'
import classnames from 'classnames'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypes,
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  options: PropTypes.arrayOf(PropTypes.string),
}

const defaultProps = {
  options: [],
}

function Select ({
  input: { name, value, onBlur, onChange },
  meta: { error, touched, invalid },
  className,
  hint,
  label,
  options,
  tooltip,
  ...rest
}) {
  return (
    <fieldset className={ classes({ className, touched, invalid }) }>

      <InputLabel { ...{ hint, label, name, tooltip } } />

      <select id={ name } { ...{ name, value, onBlur, onChange, ...rest } }>

        { options.map(option =>
          <option key={ option } value={ option }>{ option }</option>
        ) }
      </select>

      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
}

function classes ({ className, touched, invalid }) {
  return classnames(
    className,
    { error: touched && invalid }
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
