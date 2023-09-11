/**
 * @name triggerOnKeys
 * @type Function
 * @param {Function} fn - The function to trigger
 * @param {String|Array<String>} keys - String or Array of keys
 * @returns {Function} - Returns a function that takes an event and watches for keys
 *
 * @example
 *
 * const triggerOnEnter = triggerOnKeys(() => console.log('Hi'), ['Enter'])
 * function MyExample () { return <Example onKeyPress={triggerOnEnter} /> }
 */

import { castArray, compact } from 'lodash'

function triggerOnKeys(fn, keyCodes) {
  const codes = compact(castArray(keyCodes))
  return function (e) {
    // Key will be set to Unidentified if it cannot be mapped
    // Source: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key#value
    const key = e.key === 'Unidentified' ? e.code : e.key
    if (!codes.some((keyCode) => keyCode == key)) return

    return fn(e)
  }
}

export default triggerOnKeys
