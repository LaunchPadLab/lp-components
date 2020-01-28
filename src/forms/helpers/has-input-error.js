// Centralized logic for when to show an input error
function hasInputError({ invalid, touched }) {
  return invalid && touched
}

export default hasInputError
