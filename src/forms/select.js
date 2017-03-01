import React, { PropTypes } from 'react'
import classnames from 'classnames'
import fieldPropTypes from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'

const propTypes = {
  ...fieldPropTypes,
  ...InputLabel.propTypes,
  ...InputError.propTypes,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]).isRequired
    })
  ])),
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
  placeholder,
  ...rest
}) {
  const optionObjects = options.map(objectify)
  return (
    <fieldset className={ classes({ className, touched, invalid }) }>

      <InputLabel { ...{ hint, label, name, tooltip } } />

      <select id={ name } className={classnames({ unselected: value === '' })} { ...{ name, value, onBlur, onChange, ...rest } }>
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

// Tranform string option into object option
function objectify (option) {
  return (typeof option === 'string') ? { key: option, value: option } : option
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
