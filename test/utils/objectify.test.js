import { objectify } from '../../src/utils'

test('when the argument is not an array - returns the argument', () => {
  const optionArray = ''
  expect(() => objectify(optionArray)).toThrow(TypeError)
})

test('when the argument is an empty array - returns the argument', () => {
  const optionArray = []
  expect(objectify(optionArray)).toEqual([])
})

test('when the argument is an array of objects - returns the argument', () => {
  const optionArray = [{ foo: 'bar' }]
  expect(objectify(optionArray)).toEqual([{ foo: 'bar' }])
})

test('when the argument is an array of strings - returns the strings as array of objects', () => {
  const optionArray = ['foo', 'bar']
  expect(objectify(optionArray)).toEqual([{ key: 'foo', value: 'foo' }, { key: 'bar', value: 'bar' }])
})

