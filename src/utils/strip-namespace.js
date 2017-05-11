/**
 *
 * A utility function to remove the namespace from a string.
 *
 * This function returns the root string after the final period if the string 
 * contains a namespace.
 *
 * This function returns the argument if the argument is undefined, not a string,
 * or a string without a namespace.
 * 
 * @name stripNamespace
 * @type Function
 * @param {String} str
 * @example
 * 
 * stripNamespace(undefined) // undefined
 *
 * stripNamespace(1) // 1
 *
 * stripNamespace('foo') // 'foo'
 *
 * stripNamespace('foo.bar') // 'bar'
 *
 * stripNamespace('foo.bar.baz') // 'baz'
 *
**/


export default function stripNamespace (str) {
  if (!str || typeof str !== 'string') return str
  return str.split('.').pop()
}
