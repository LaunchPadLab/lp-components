import { TableColumn } from '../../src'

test('TableColumn has empty render function', () => {
  expect(TableColumn()).toEqual(null)
})