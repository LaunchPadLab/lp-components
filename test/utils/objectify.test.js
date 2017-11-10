import { serializeOptions } from '../../src'

test('when the argument is not an array - throws an error', () => {
  const optionArray = ''
  expect(() => serializeOptions(optionArray)).toThrow(TypeError)
})

test('when the argument is an empty array - returns the argument', () => {
  const optionArray = []
  expect(serializeOptions(optionArray)).toEqual([])
})

test('when the argument is an array of objects - returns the argument', () => {
  const optionArray = [{ foo: 'bar' }]
  expect(serializeOptions(optionArray)).toEqual([{ foo: 'bar' }])
})

test('when the argument is an array of strings - returns the strings as array of objects', () => {
  const optionArray = ['foo', 'bar']
  expect(serializeOptions(optionArray)).toEqual([{ key: 'foo', value: 'foo' }, { key: 'bar', value: 'bar' }])
})

