/**
 * @name triggerOnKeys
 * @type Function
 * @param {Function} fn - The function to trigger
 * @param {Number|String|Array<Number|String>} keyCodes - Number, String, or Array of key codes
 * @returns {Function} - Returns a function that takes an event and watches for keys
 *
 * @example
 *
 * const triggerOnEnter = triggerOnKeys(() => console.log('Hi'), [13])
 * function MyExample () { return <Example onKeyPress={triggerOnEnter} /> }
 */

import { castArray, compact } from 'lodash'

function triggerOnKeys(fn, keyCodes) {
  const codes = compact(castArray(keyCodes))
  return function(e) {
    const key = e.which || e.keyCode
    if (!codes.some((keyCode) => keyCode == key)) return

    return fn(e)
  }
}

export default triggerOnKeys
