import PropTypes from 'prop-types'

/**
 *
 * A constant representing the `PropTypes` of the `options` prop for select components, e.g., {@link Select} and {@link CheckboxGroup}
 * 
 * @constant {PropTypes} fieldOptionsType
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

/**
 *
 * A function that takes `PropTypes` for a `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) object.
 * Returns an object containing all `PropTypes` for `redux-forms` [Field](http://redux-form.com/6.5.0/docs/api/Field.md/) components.
 * 
 * @name fieldPropTypesWithValue
 * @type Function
 * @param {PropTypes} value - `PropTypes` object
 * @returns {Object} `PropTypes` for `redux-forms` [input](http://redux-form.com/6.5.0/docs/api/Field.md/#input-props) and [meta](http://redux-form.com/6.5.0/docs/api/Field.md/#meta-props) objects
 * @example
 * 
 * const valuePropType = PropTypes.string
 * 
 * fieldPropTypesWithValue(valuePropType)
 *
 * // {
 * //   input: PropTypes.shape({
 * //     value: PropTypes.string.isRequired,
 * //     name: PropTypes.string.isRequired,
 * //     onBlur: PropTypes.func,
 * //     onChange: PropTypes.func
 * //   }),
 * //   meta: PropTypes.shape({
 * //     dirty: PropTypes.bool,
 * //     invalid: PropTypes.bool,
 * //     pristine: PropTypes.bool,
 * //     touched: PropTypes.bool,
 * //     valid: PropTypes.bool,
 * //   }).isRequired
 * // }
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

/** 
 *
 * A constant representing default `PropTypes` for `redux-forms` [Field](http://redux-form.com/6.5.0/docs/api/Field.md/) values.
 * Default types are either `number` or `string`.
 * 
 * @constant {PropTypes} defaultValueTypes
 *
**/

const defaultValueTypes = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number
])

/** 
 *
 * An object containing the default `PropTypes` for `redux-forms` [Field](http://redux-form.com/6.5.0/docs/api/Field.md/) components.
 * 
 * @constant {Object} fieldPropTypes
 *
**/

export const fieldPropTypes = fieldPropTypesWithValue(defaultValueTypes)
