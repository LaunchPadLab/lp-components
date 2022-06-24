import { first, last } from 'lodash'

// Adds extension to file name
function addExtension (fileName, file) {
  const rootName = first(fileName.split('.'))
  const extension = last(file.name.split('.'))
  return `${ rootName }.${ extension }`
}

export default addExtension