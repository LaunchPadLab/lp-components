import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { fieldPropTypesWithValue } from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'
import Checkbox from './checkbox'
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

function CheckboxGroup ({
  input: { name, value, onChange },
  meta: { error, touched, invalid },
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
          return (
            <Checkbox
              key={ option.key }
              input={{
                name: option.key,
                value: value.includes(option.value),
                onChange: (checked) => {
                  // Add or remove value from array
                  const newValue = checked ? union([option.value], value) : difference([option.value], value)
                  return onChange(newValue)
                }
              }}
              meta={{}}
              { ...rest }
            />
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
    'CheckboxGroup',
    { error: touched && invalid }
  )
}

CheckboxGroup.propTypes = propTypes
CheckboxGroup.defaultProps = defaultProps

export default CheckboxGroup
