/**
 *
 * A utility function to remove the namespace from a string.
 
 * This function returns the last half separated string.
 * 
 * @name stripNamespace
 * @type Function
 * @param {String} str
 * @example
 * 
 *  
 *
**/


export default function stripNamespace (str) {
  if (!str || typeof str !== 'string') return str
  return str.split('.').pop()
}
