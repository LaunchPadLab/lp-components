import { compareAtPath } from '../../src/'
import copy from 'lodash/cloneDeep'

const people = [
  { name: 'Georgina', age: 66 },
  { name: 'Brad', age: 35 },
]

const sortAscending = (a, b) => a - b

test('pulls out values and runs comparison func on them', () => {
  const innerFunc = jest.fn(sortAscending)
  const ageComparator = compareAtPath('age', innerFunc)
  const sortedPeople = copy(people).sort(ageComparator)
  expect(innerFunc.mock.calls[0]).toEqual(expect.arrayContaining([66, 35]))
  expect(sortedPeople[0].name).toEqual('Brad')
})

test('is curried', () => {
  const innerFunc = jest.fn(sortAscending)
  const ageComparator = compareAtPath('age')(innerFunc)
  const sortedPeople = copy(people).sort(ageComparator)
  expect(innerFunc.mock.calls[0]).toEqual(expect.arrayContaining([66, 35]))
  expect(sortedPeople[0].name).toEqual('Brad')
})
