
// Prepend a string value with a hash

function toHex (value) {
  return value ? `#${value}` : ''
} 

export default toHex