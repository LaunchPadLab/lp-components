import get from 'lodash/fp/get'
import curry from 'lodash/fp/curry'

// Returs a comparison function that extracts values at a certain path 
// and runs given comparison function on those values.

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

function compareAtPath (path, func) {
  const getter = get(path)
  return function compare (a, b) {
    const [ aValue, bValue ] = [a, b].map(getter)
    return func(aValue, bValue)
  }
}

export default curry(compareAtPath)