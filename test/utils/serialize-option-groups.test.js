import { serializeOptionGroups } from '../../src'

test('when the argument is not an array - throws an error', () => {
  const optionGroupArray = ''
  expect(() => serializeOptionGroups(optionGroupArray)).toThrow(TypeError)
})

test('when the argument is an empty array - returns the argument', () => {
  const optionGroupArray = []
  expect(serializeOptionGroups(optionGroupArray)).toEqual([])
})

test('when the argument options is an array of objects - returns the argument', () => {
  const optionGroupArray = [{ name: 'group', options: [{ foo: 'bar' }] }]
  expect(serializeOptionGroups(optionGroupArray))
    .toEqual([{ name: 'group', options: [{ foo: 'bar' }] }])
})

test('when the argument options is an array of strings - returns the strings as array of objects', () => {
  const optionGroupArray = [{ name: 'group', options: ['foo', 'bar'] }]
  expect(serializeOptionGroups(optionGroupArray))
    .toEqual([
      { 
        name: 'group', 
        options: [{ key: 'foo', value: 'foo' }, { key: 'bar', value: 'bar' }]
      },
    ])
})

test('when there are multiple option groups - serializes each set of options', () => {
  const optionGroupArray = [{ name: 'group1', options: ['foo'] }, { name: 'group2', options: ['bar'] }]
  expect(serializeOptionGroups(optionGroupArray))
    .toEqual([
      { name: 'group1', options: [{ key: 'foo', value: 'foo' }] }, 
      { name: 'group2', options: [{ key: 'bar', value: 'bar' }] },
    ])
})