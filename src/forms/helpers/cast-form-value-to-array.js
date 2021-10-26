import { castArray } from '../../utils'

// Casts value(s) to an array
function castFormValueToArray (value) {
  if (!value) return []
  return castArray(value)
}

export default castFormValueToArray
