import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from './checkbox'
import { fieldPropTypesWithValue, fieldOptionsType } from '../helpers'
import { LabeledField } from '../labels'
import { addToArray, removeFromArray, objectify } from '../../utils'

const propTypes = {
  ...fieldPropTypesWithValue(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    )
  ),
  options: fieldOptionsType
}

const defaultProps = {
  options: []
}

function CheckboxGroup (props) {
  const {
    input: { value, onChange },
    options,
    ...rest
  } = props

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
    <LabeledField className="CheckboxGroup" { ...props }>
      {
        optionObjects.map((option) => {
          return (
            <Checkbox
              {...{
                key: option.key,
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
    </LabeledField>
  )
}

CheckboxGroup.propTypes = propTypes
CheckboxGroup.defaultProps = defaultProps

export default CheckboxGroup
