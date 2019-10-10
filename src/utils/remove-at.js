// Removes value at the specified index and returns both the value and the new array
function removeAt (arr, index) {
  const remaining = [...arr]
  const removed = remaining.splice(index, 1)[0] // splice always returns an array
  
  return [removed, remaining]
}

export default removeAt
