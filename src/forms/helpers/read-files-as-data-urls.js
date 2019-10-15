// Reads files and returns objects with file information and base64 encoded string url
async function readFilesAsDataUrls (files) {
  const filePromises = files.map(async (file) => {
    const fileData = await readFile(file)
    return createFileValueObject(file, fileData)
  })
  
  return Promise.all(filePromises)
}

// ----- PRIVATE ------

// Read a file and convert it to a base64 string (promisified)
function readFile (file) {
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

export default readFilesAsDataUrls

