// Return new array with element added or removed if already exists

function toggleElementArray(arr, el) {
  // check if element exists already and remove
  if (arr.includes(el)) {
    return arr.filter((obj) => obj !== el)
  }
  // if not, add element to current array
  return [...arr, el]
}

export default toggleElementArray
