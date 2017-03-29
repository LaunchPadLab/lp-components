import { PropTypes } from 'react'

// Option types for selects - e.g. Select and CheckboxGroup

export const fieldOptionsType = PropTypes.arrayOf(
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
)

// Proptypes for redux-form field components

export function fieldPropTypesWithValue (value) {
  return {
    input: PropTypes.shape({
      value: value.isRequired,
      name: PropTypes.string.isRequired,
      onBlur: PropTypes.func,
      onChange: PropTypes.func
    }),
    meta: PropTypes.shape({
      dirty: PropTypes.bool,
      invalid: PropTypes.bool,
      pristine: PropTypes.bool,
      touched: PropTypes.bool,
      valid: PropTypes.bool,
    }).isRequired
  }
}

// By default, field values should be strings or numbers

const defaultValueTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

const fieldPropTypes = fieldPropTypesWithValue(defaultValueTypes)

export default fieldPropTypes
  
