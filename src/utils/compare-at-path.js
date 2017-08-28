import get from 'lodash/fp/get'
import curry from 'lodash/fp/curry'

// Returs a comparison function that extracts values at a certain path 
// and runs given comparison function on those values.

const compareAtPath = curry((path, func) => {
  const getter = get(path)
  return function compare (a, b) {
    const [ aValue, bValue ] = [a, b].map(getter)
    return func(aValue, bValue)
  }
})

export default compareAtPath