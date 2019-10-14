import { castArray } from '../../../utils'

export async function readFiles ({ newFiles, existingFiles }) {
  // Do not reload files that have been successfully loaded
  const filesToLoad = newFiles.filter((file) => {
    return !existingFiles.some(({ name, lastModified }) => {
      return name === file.name && lastModified === file.lastModified
    })
  })
  
  const filePromises = filesToLoad.map(async (file) => {
    const fileData = await readFileData(file)
    return createFileValueObject(file, fileData)
  })
  
  return Promise.all(filePromises)
}

export function castToFileArray (values) {
  if (!values) return []
  return castArray(values)
}

// ----- PRIVATE ------

// Read a file and convert it to a base64 string (promisified)
function readFileData (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (readEvent) => {
      resolve(readEvent.target.result)
    }
    reader.onerror = reject
    
    reader.readAsDataURL(file)
  })
}

// Copy metadata related to a file, but not the actual File object. These
// properties are not enumerable / visible in Redux.
function createFileValueObject (file, dataUrl='') {
  return {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified,
    url: dataUrl,
  }
}
