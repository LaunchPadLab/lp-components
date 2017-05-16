// A utility function to remove the leading namespace from a string.
// Returns the root string after the final period in a period-delineated string.
// Returns the argument if it is undefined or not a string.


export default function stripNamespace (str) {
  if (!str || typeof str !== 'string') return str
  return str.split('.').pop()
}
