import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { generateInputErrorId } from '../../utils'

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
 * This label supports accessibility by adding a uniquely generated id to the span which should be referenced by the input using `aria-describedby`.
 *
 * In addition to the props below, any extra props will be passed directly to the inner `<span>` element.
 *
 * @name InputError
 * @type Function
 * @param {String|Array} error - An error message or array of error messages to display
 * @param {Boolean} invalid - Whether the associated input has an invalid value
 * @param {String} touched - Whether the associated input has been touched
 * @param {String} name - The name of the input (used to generate a unique ID)
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
 *       <InputError { ...{ error, invalid, touched, name } } />
 *     </div>
 *   )
 * }
 *
 */

const propTypes = {
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  invalid: PropTypes.bool,
  touched: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
}

const defaultProps = {
  error: null,
  invalid: false,
  touched: false,
  className: '',
  name: '',
}

function InputError ({ error, invalid, touched, name, className, ...rest }) {
  return (touched && invalid)
    ? <span
        id={ generateInputErrorId(name) }
        className={ classnames('error-message', className) }
        { ...rest }
      >
        { formatError(error) }
      </span>
    : null
}

function formatError (error) {
  return Array.isArray(error) ? error.join(', ') : error
}

InputError.propTypes = propTypes
InputError.defaultProps = defaultProps

export default InputError
