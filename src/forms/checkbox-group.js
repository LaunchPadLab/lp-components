import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { fieldPropTypesWithValue, fieldOptionsType } from './field-proptypes'
import InputError from './input-error'
import InputLabel from './input-label'
import Checkbox from './checkbox'
import { addToArray, removeFromArray, objectify } from '../utils'

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
  options: fieldOptionsType
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
  const optionObjects = objectify(options)
  // Build change handler
  const handleChange = function (option) {
    return function (checked) {
      // Add or remove option value from array of values, depending on whether it's checked
      const newValueArray = checked ? addToArray([option.value], value) : removeFromArray([option.value], value)
      return onChange(newValueArray)
    }
  }
  return (
    <fieldset className={ classes({ touched, invalid }) }>
      <InputLabel { ...{ hint, label, name, tooltip } } />
      { 
        optionObjects.map((option) => {
          return (
            <Checkbox 
              {...{
                key: options.key,
                input: {
                  name: option.key,
                  value: value.includes(option.value),
                  onChange: handleChange(option)
                },
                meta: {},
                ...rest
              }}
            />
          )
        })
      }

      <InputError { ...{ error, invalid, touched } } />
    </fieldset>
  )
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
