import { addExtension } from '../../../../../src/forms/inputs/cloudinary-file-input/helpers'

const file = { name: 'file.xls' }

test('`addExtension` adds file extension', () => {
  const filename = 'test'
  expect(addExtension(filename, file)).toEqual('test.xls')
})

test('`addExtension` does not change file name with extension', () => {
  const filename = 'test.xls'
  expect(addExtension(filename, file)).toEqual('test.xls')
})
