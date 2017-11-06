import { startCase, stripNamespace } from '../../utils'

/**
 *
 * A helper function to transform a redux-form field name into a label string 
 * by stripping its namespace and converting it to start case. 
 * 
 * @name convertNameToLabel
 * @type Function
 * @param {String} name - A redux-form field name
 * @returns {String} - A user-friendly field label
 * @example
 * 
 * convertNameToLabel('example') // -> 'Example'
 * convertNameToLabel('person.firstName') // -> 'First Name'
 *
**/

function convertNameToLabel (name) {
  return startCase(stripNamespace(name))
}

export default convertNameToLabel