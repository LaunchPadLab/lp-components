import { readFilesAsDataUrls } from '../../../src'

describe('readFilesAsDataUrls', () => {
  test('returns an array of file objects', async () => {
    const file = new File(['content'], 'fileName.png', { type: 'image/png' })
    const result = await readFilesAsDataUrls([file])
    expect(Object.keys(result.at(0))).toEqual(
      expect.arrayContaining(['name', 'size', 'type', 'lastModified', 'url'])
    )
    expect(Object.values(result.at(0)).every(Boolean)).toBe(true)
  })

  test('returns an empty url when run on the server', async () => {
    const file = new File(['content'], 'fileName.png', { type: 'image/png' })

    const originalWindow = setWindowValue(undefined)
    const result = await readFilesAsDataUrls([file])
    expect(result.at(0).url).toEqual('')

    setWindowValue(originalWindow)
  })
})

// HELPERS

function setWindowValue(value) {
  // eslint-disable-next-line no-undef
  const originalWindow = global.window
  // eslint-disable-next-line no-undef
  Object.defineProperty(global, 'window', {
    value
  })

  return originalWindow
}