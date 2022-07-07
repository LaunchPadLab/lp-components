/**
 *
 * A utility function to remove the leading namespace from a string.
 * Returns the root string after the final period in a period-delineated string.
 * Returns the argument if it is undefined or not a string.
 *
 * @name stripNamespace
 * @type Function
 * @param {String} str - Namespaced string
 * @returns {String} String with namespace removed
 *
 * @example
 *
 * const namespace = 'user.profile.name'
 *
 * stripNamespace(namespace)
 *
 * // 'name'
 *
 */

function stripNamespace(str) {
  if (!str || typeof str !== 'string') return str
  return str.split('.').pop()
}

export default stripNamespace
