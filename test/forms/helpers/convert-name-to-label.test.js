import { convertNameToLabel } from '../../../src/'

test('converts case', () => {
  expect(convertNameToLabel('example')).toEqual('Example')
})

test('strips namespace', () => {
  expect(convertNameToLabel('person.firstName')).toEqual('First Name')
})
