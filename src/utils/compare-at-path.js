import get from 'lodash/fp/get'
import curry from 'lodash/fp/curry'

/**
 *
 * A function which returns a comparison function that extracts values at a 
 * certain path, and runs given comparison function on those values.
 *
 * @name compareAtPath
 * @type Function
 * @param {String} path - Name of the path to values
 * @param {Function} func - Comparison function to run on values at specified path
 * @returns {Function} Comparison function
 *
 * @example
 * 
 * const people = [
 *  { name: 'Brad', age: 66 },
 *  { name: 'Georgina', age: 35 }
 * ]
 * 
 * const sortAscending = (a, b) => a - b
 *
 * const ageComparator = compareAtPath('age', sortAscending)
 *
 * people.sort(ageComparator)
 * 
 * // [
 * //   { name: 'Georgina', age: 35 },
 * //   { name: 'Brad', age: 66 },
 * // ]
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