import { removeExtension } from '../../../../../src/forms/inputs/cloudinary-file-input/helpers'

test('`removeExtension` removes file extension', () => {
  const filename = 'test.jpg'
  expect(removeExtension(filename)).toEqual('test')
})

test('`removeExtension` returns original string if no extension', () => {
  const filename = 'test'
  expect(removeExtension(filename)).toEqual('test')
})
