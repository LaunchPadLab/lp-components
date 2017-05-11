import { stripNamespace } from '../../src/utils'

test('when the argument is not a string - returns the argument', () => {
  const str = 2
  expect(stripNamespace(str)).toBe(str)
})

test('when the argument is undefined - returns the argument', () => {
  const str = undefined
  expect(stripNamespace(str)).toBe(str)
})

test('when the argument is a string with one namespace - returns the string with the namespace removed', () => {
  const str = 'foo.bar'
  expect(stripNamespace(str)).toBe('bar')
})

test('when the argument is a string multiple namespaces - returns the string with the leading namespaces removed', () => {
  const str = 'foo.bar.baz'
  expect(stripNamespace(str)).toBe('baz')
})