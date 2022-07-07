// Returns true if file type contains string `image`

function isImageType(file) {
  if (!file) return false
  return file.type && file.type.includes('image')
}

export default isImageType
