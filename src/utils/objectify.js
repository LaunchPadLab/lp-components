/**
 *
 * Function that transforms string options into object options with keys of
 * `key` and `value`
 *
 * @name objectify
 * @type Function
 * @param {Array} optionArray - Array of option values
 * @returns {Array} Array of object options
 *
 * @example
 * 
 * const options = ['apple', 'banana']
 * 
 * objectify(options)
 *
 * // [{ key: 'apple', value: 'apple' }, { key: 'banana', value: 'banana' }]
 *
**/

export default function objectify (optionArray) {
  return optionArray.map((option) => {
    return (typeof option === 'string') ? { key: option, value: option } : option
  })
}
