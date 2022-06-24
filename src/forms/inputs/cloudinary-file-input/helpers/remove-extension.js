// Returns file name without the extension
function removeExtension (fileName) {
  const extensionIdx = fileName.lastIndexOf('.')
  return extensionIdx > 0 ? fileName.slice(0, extensionIdx) : fileName
}

export default removeExtension