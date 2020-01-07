/**
 * A utility for generating a unique id for an input error label. This logic
 * is centralized to facilitate reference by multiple input components.
 * 
 * @name generateInputErrorId
 * @param {String} name - The name of the input
 * @returns {String} String representing error id
 * 
 * @example
 * 
 * const name = 'cardNumber'
 * 
 * generateInputErrorId(name)
 *
 * // 'cardNumberError'
 */

function generateInputErrorId (name) {
  if (!name) return ''
  return name + "Error"
}

export default generateInputErrorId
