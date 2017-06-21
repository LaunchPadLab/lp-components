import PropTypes from 'prop-types'

/**
 *
 * A constant representing option `PropTypes` for select elements, e.g., {@link Select} and {@link CheckboxGroup}
 * 
 * @name fieldOptionsType
 * @const
 * 
**/

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

/**
 *
 * A function that returns the PropTypes for `redux-forms` [Field](http://redux-form.com/6.5.0/docs/api/Field.md/) components
 * 
 * @name fieldPropTypesWithValue
 * @type Function
 * @param {String|Number} value - The input value
 * @returns {Object} with input and meta `PropTypes`
 * @example
 *
**/

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

/** @const {PropTypes} default field values should be strings or numbers */

const defaultValueTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

const fieldPropTypes = fieldPropTypesWithValue(defaultValueTypes)

export default fieldPropTypes
  
