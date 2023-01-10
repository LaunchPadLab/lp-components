import calculateMiddlePages from '../../../src/controls/paginator/calculate-middle-pages'

test('returns empty array when max and min are equal', () => {
  const currentPage = 1
  const max = 1
  const min = 1
  expect(calculateMiddlePages(currentPage, min, max)).toEqual([])
})

test('throws error when min is less than max', () => {
  const currentPage = 1
  const max = 1
  const min = 2
  expect(() => calculateMiddlePages(currentPage, min, max)).toThrow()
})

test('shows all pages by default', () => {
  const currentPage = 1
  const max = 5
  const min = 1
  expect(calculateMiddlePages(currentPage, min, max)).toEqual([2, 3, 4])
})

test('shows pages to left and right of current page', () => {
  const currentPage = 5
  const max = 10
  const min = 1
  const numPagesShown = 3
  expect(calculateMiddlePages(currentPage, min, max, numPagesShown)).toEqual([
    4, 5, 6,
  ])
  expect(calculateMiddlePages(currentPage, min, max, 5)).toEqual([
    3, 4, 5, 6, 7,
  ])
  expect(calculateMiddlePages(currentPage, min, max, 4)).toEqual([3, 4, 5, 6])
})

test('trims pages to min and offsets last page accordingly', () => {
  const currentPage = 3
  const max = 10
  const min = 1
  const numPagesShown = 5
  expect(calculateMiddlePages(currentPage, min, max, numPagesShown)).toEqual([
    2, 3, 4, 5,
  ])
  expect(calculateMiddlePages(currentPage, min, 5, numPagesShown)).toEqual([
    2, 3, 4,
  ])
})

test('trims pages to max and offsets first page accordingly', () => {
  const currentPage = 8
  const max = 10
  const min = 1
  const numPagesShown = 5
  expect(calculateMiddlePages(currentPage, min, max, numPagesShown)).toEqual([
    6, 7, 8, 9,
  ])
  expect(calculateMiddlePages(currentPage, 5, max, numPagesShown)).toEqual([
    6, 7, 8, 9,
  ])
})
