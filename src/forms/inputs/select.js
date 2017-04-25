import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import fieldPropTypes, { fieldOptionsType } from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'
import { objectify } from '../utils'

const propTypes = {
  ...fieldPropTypes,
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  placeholder: PropTypes.string,
  options: fieldOptionsType
}

const defaultProps = {
  options: [],
}

function Select ({
  input: { name, value, onBlur, onChange },
  meta: { error, pristine, touched, invalid },
  className,
  hint,
  label,
  options,
  tooltip,
  placeholder,
  ...rest
}) {
  const optionObjects = objectify(options)
  const classes = classnames(className, { error: touched && invalid })
  return (
    <fieldset className={ classes }>

      <InputLabel { ...{ hint, label, name, tooltip } } />

      <select 
        onBlur={ pristine ? null : onBlur }
        className={classnames({ unselected: value === '' })}
        { ...{ id: name, name, value, onBlur, onChange, ...rest } }
      >
        { 
          placeholder &&
          <option value='' disabled>{ placeholder }</option>
        }
        { 
          optionObjects.map(({ key, value }) =>
            <option key={ key } value={ value }>{ key }</option>
          )
        }
      </select>

      <InputError { ...{ error, invalid, touched } } />
      
    </fieldset>
  )
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
