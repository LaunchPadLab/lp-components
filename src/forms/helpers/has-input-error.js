// Centralized logic for when to show an input error
function hasInputError(meta) {
  const { invalid, touched } = meta
  return invalid && touched
}

export default hasInputError
