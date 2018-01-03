import serializeOptions from './serialize-options'

/**
 *
 * Function that transforms options within an option group array into 
 * object options with keys of `key` and `value`
 *
 * @name serializeOptionGroups
 * @type Function
 * @param {Array} optionGroupArray - Array of option values
 * @returns {Array} Array of object group options
 *
 * @example
 *
 * const optionGroups = [ 
 *  { name: 'fruits', options: ['apple', 'banana'] },
 *  { name: 'veggies', options: ['lettuce', 'pepper'] },
 * ]
 *
 * serializeOptionGroups(optionGroups)
 *
 * // [
 * //   { 
 * //     name: 'fruits', 
 * //     options: [{ key: 'apple', value: 'apple' }, { key: 'banana', value: 'banana' }] 
 * //   }, 
 * //   { 
 * //     name: 'veggies', 
 * //     options: [{ key: 'lettuce', value: 'lettuce' }, { key: 'pepper', value: 'pepper' }] 
 * //   },
 * // ]
 *
**/

export default function serializeOptionGroups (optionGroupArray) {
  return optionGroupArray.map(group => ({ ...group, options: serializeOptions(group.options) }))
}
