/**
 *
 * Function that transforms string options into object options with keys of
 * `key` and `value`
 *
 * @name serializeOptions
 * @type Function
 * @param {Array} optionArray - Array of option values
 * @returns {Array} Array of object options
 *
 * @example
 *
 * const options = ['apple', 'banana']
 *
 * serializeOptions(options)
 *
 * // [{ key: 'apple', value: 'apple' }, { key: 'banana', value: 'banana' }]
 *
 */

export default function serializeOptions (optionArray) {
  return optionArray.map((option) => {
    return (typeof option === 'object') ? option : { key: option, value: option }
  })
}
