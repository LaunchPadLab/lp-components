import { buttonClasses } from '../../../src/'

test('returns style with `button-` prepended', () => {
  expect(buttonClasses({ style: 'primary' })).toEqual('button-primary')
})

test('returns correct classes when submitting', () => {
  expect(buttonClasses({ style: 'primary', submitting: true })).toEqual('button-primary in-progress')
})

test('returns correct classes when invalid', () => {
  expect(buttonClasses({ style: 'primary', invalid: true })).toEqual('button-primary is-disabled')
})

test('returns correct classes when pristine', () => {
  expect(buttonClasses({ style: 'primary', pristine: true })).toEqual('button-primary is-disabled')
})

test('returns correct classes when classname is provided', () => {
  expect(buttonClasses({ style: 'primary', className: 'button-large' })).toEqual('button-primary button-large')
})
