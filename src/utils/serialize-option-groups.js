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
 *  { name: 'group1', options: ['apple', 'banana'] },
 *  { name: 'group2', options: ['orange', 'blueberry'] },
 * ]
 *
 * serializeOptionGroups(optionGroups)
 *
 * // [
 * //   { 
 * //     name: 'group1', 
 * //     options: [{ key: 'apple', value: 'apple' }, { key: 'banana', value: 'banana' }] 
 * //   }, 
 * //   { 
 * //     name: 'group2', 
 * //     options: [{ key: 'orange', value: 'orange' }, { key: 'blueberry', value: 'blueberry' }] 
 * //   },
 * // ]
 *
**/

export default function serializeOptionGroups (optionGroupArray) {
  return optionGroupArray.map(group => ({ ...group, options: serializeOptions(group.options) }))
}
