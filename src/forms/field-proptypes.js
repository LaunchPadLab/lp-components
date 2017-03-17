import { PropTypes } from 'react'

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

const defaultValueTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

const fieldPropTypes = fieldPropTypesWithValue(defaultValueTypes)

export default fieldPropTypes
  
