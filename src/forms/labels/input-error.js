import React from 'react'
import PropTypes from 'prop-types'

/**
 *
 * A dynamic error label associated with an input component.
 * 
 * This component is used within {@link LabeledField}, and therefore is incorporated into most `lp-components` input components by default.
 *
 * The error label uses the following rules to determine how it will be displayed:
 * - If the input is `invalid` and `touched`, the label will be shown
 * - If the `error` prop is set to a string, the label will display that text
 * - If the `error` prop is set to an array of strings, the label will display those errors separated by commas
 *
 * @name InputError
 * @type Function
 * @param {String|Array} error - An error message or array of error messages to display
 * @param {Boolean} invalid - Whether the associated input has an invalid value
 * @param {String} touched - Whether the associated input has been touched
 *
 * @example
 * 
 * // A custom input to use with redux-forms
 * 
 * function ValidatedInput ({  
 *   input: { name, value, onBlur, onChange },
 *   meta: { error, touched, invalid },
 * }) {
 *   return (
 *      <div>
 *       <input {...{
 *          name,
 *          value,
 *          onBlur,
 *          onChange,   
 *       }}
 *       <InputError { ...{ error, invalid, touched } } />
 *     </div>
 *   )
 * }
 *
**/

const propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  invalid: PropTypes.bool,
  touched: PropTypes.bool,
}

function InputError ({ error, invalid, touched }) {
  return (touched && invalid)
    ? <span className="error-message">{ formatError(error) }</span>
    : null
}

function formatError (error) {
  return (Array.isArray(error)) ? error.join(', ') : error
}

InputError.propTypes = propTypes

export default InputError
