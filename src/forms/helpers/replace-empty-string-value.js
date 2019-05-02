import React from 'react'
import { wrapDisplayName, set } from '../../utils'

/**
 *
 * A function that returns an HOC to wrap a `redux-forms`-controlled input. 
 *
 * This HOC transforms empty string values into a different specified value.
 * This helps inputs with non-string values avoid PropType errors when provided with 
 * the default redux-form initial value (an empty string).
 * 
 * @name replaceEmptyStringValue
 * @param {*} [replacement=''] The value that will replace an empty string value
 * @type Function
 * @example
 * 
 * function Checkbox ({ input: { value } }) {
 *   return (
 *     <input type="checkbox" value={ value }>
 *   )
 * }
 *
 * Checkbox.propTypes = PropTypes.shape({
 *    input: PropTypes.shape({
 *      value: PropTypes.bool,
 *    })
 * })
 *
 * export default compose(
 *    replaceEmptyStringValue(false)
 * )(Checkbox)
 */

/* eslint react/prop-types: off */

function replaceEmptyStringValue (replacement='') {
  return Wrapped => {
    function Wrapper (props) {
      const {
        input: { value },
      } = props
      const passedProps = (value === '') ? set('input.value', replacement, props) : props
      return (
        <Wrapped { ...passedProps } />
      )
    }
    Wrapper.displayName = wrapDisplayName(Wrapped, 'replaceEmptyStringValue')
    return Wrapper
  }
}

export default replaceEmptyStringValue
