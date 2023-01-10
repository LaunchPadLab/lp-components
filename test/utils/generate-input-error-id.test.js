import { generateInputErrorId } from '../../src'

test('when the name is empty - returns nothing', () => {
  const name = ''
  expect(generateInputErrorId(name)).toBe('')
})

test('when the name is undefined - returns nothing', () => {
  const name = undefined
  expect(generateInputErrorId(name)).toBe('')
})

test('when the name is provided - appends a string', () => {
  const name = 'foo'
  const strToAppend = 'Error'
  expect(generateInputErrorId(name)).toBe(name + strToAppend)
})
