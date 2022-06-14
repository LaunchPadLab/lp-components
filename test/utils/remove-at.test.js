import { removeAt } from '../../src/utils'

describe('Remove at utility', () => {
  test('Returns an array with two items', () => {
    const items = []
    expect(removeAt(items, 1)).toHaveLength(2)
  })
  
  test('Does not modify the original array', () => {
    const items = [1, 2]
    expect(removeAt(items, 1)[1]).not.toBe(items)
    expect(items).toEqual([1, 2])
  })
  
  test('Returns the removed item', () => {
    const items = [1, 2, 3]
    expect(removeAt(items, 0)[0]).toBe(1)
  })
  
  test('Returns the remaining items', () => {
    const items = [1, 2, 3]
    expect(removeAt(items, 0)[1]).toEqual([2, 3])
  })
  
  test('Returns undefined for the removed item if the index doesn\'t exist', () => {
    const items = [1]
    expect(removeAt(items, 1)[0]).toBe(undefined)
  })
  
  test('Returns the entire array for the remaining items if the index doesn\'t exist', () => {
    const items = [1]
    expect(removeAt(items, 1)[1]).toEqual(items)
  })
})
