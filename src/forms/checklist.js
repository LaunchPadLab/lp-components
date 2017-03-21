import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { fieldPropTypesWithValue } from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'
import { union, difference } from '../utils'

const propTypes = {
  ...fieldPropTypesWithValue(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    )
  ),
  ...InputError.propTypes,
  ...InputLabel.propTypes,
  label: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number
        ]).isRequired
      })
    ])
  ),
}

const defaultProps = {
  options: []
}

function Checklist ({
  input: { name, value, onBlur, onChange },
  meta: { error, pristine, touched, invalid },
  hint,
  label,
  tooltip,
  options,
  ...rest
}) {
  const optionObjects = options.map(objectify)
  return (
    <fieldset className={ classes({ touched, invalid }) }>
      <InputLabel { ...{ hint, label, name, tooltip } } />
      { 
        optionObjects.map((option) => {
          const [ optionKey, optionValue ] = [ option.key, option.value ]
          const checked = value.includes(optionValue)
          return (
            <div key={optionKey}>
              <input
                id={optionKey}
                type="checkbox"
                checked={checked}
                name={optionKey}
                onBlur={ pristine ? null : () => onBlur() }
                onChange={ () => {
                  // Toggle checked
                  const isSelected = !checked
                  // Add or remove value from array
                  const newValue = isSelected ? union([optionValue], value) : difference([optionValue], value)
                  return onChange(newValue)
                }}
                { ...rest }
              />
              <InputLabel name={optionKey} label={optionKey} />
            </div>
          )
        })
      }

      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
}

// Tranform string option into object option
function objectify (option) {
  return (typeof option === 'string') ? { key: option, value: option } : option
}

function classes ({ touched, invalid }) {
  return classnames(
    'checklist',
    { error: touched && invalid }
  )
}

Checklist.propTypes = propTypes
Checklist.defaultProps = defaultProps

export default Checklist
