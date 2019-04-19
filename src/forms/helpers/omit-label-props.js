import { omit } from '../../utils'

/**
 *
 * A function that takes a form component `props` object and returns the `props` object with {@link InputLabel} props omitted.
 * Created in order to prevent these props from being passed down to the input component through `...rest`.
 *
 * Omits the following props:
 * - `hint`
 * - `tooltip`
 * - `label`
 * - `requiredIndicator`
 * 
 * @name omitLabelProps
 * @type Function
 * @param {Object} props - A props object
 * @returns {Object} `props` object with {@link InputLabel} props omitted
 * @example
 * 
 * const props = {
 *    label: 'Biography',
 *    hint: 'A short biography',
 *    tooltip: 'Help us learn more about you!',
 *    requiredIndicator: '*',
 *    maxLength: 1000
 * }
 * 
 * omitLabelProps(props)
 *
 * // {
 * //   maxLength: 1000
 * // } 
 *
 * // Use in a form input component
 *
 * function Input (props) {
 *    const {
 *      input: { name, value, onBlur, onChange },
 *      type,
 *      ...rest
 *    } = omitLabelProps(props)
 *    return ( 
 *      ... 
 *    )
 * }
 *
 */

function omitLabelProps (props) {
  return omit([
    'hint',
    'tooltip',
    'label',
    'requiredIndicator',
    'errorComponent',
    'labelComponent',
  ], props)
}

export default omitLabelProps
