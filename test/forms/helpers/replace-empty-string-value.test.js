import { replaceEmptyStringValue } from '../../../src/'
import React from 'react'
import { render, screen } from '@testing-library/react'

const InputToWrap = ({ input: { value } }) => (
  <input value={value} readOnly={true} />
)

test('has correct displayName', () => {
  const WrappedInput = replaceEmptyStringValue()(InputToWrap)
  expect(WrappedInput.displayName).toEqual('replaceEmptyStringValue(InputToWrap)')
})

test('replaces empty string with given value', () => {
  const WrappedInput = replaceEmptyStringValue('foo')(InputToWrap)
  render(<WrappedInput {...{ input: { value: '' }, meta: {} }} />)
  expect(screen.getByRole('textbox')).toHaveValue('foo')
})

test("doesn't replace other values", () => {
  const WrappedInput = replaceEmptyStringValue('foo')(InputToWrap)
  render(
    <WrappedInput {...{ input: { value: 'other' }, meta: {} }} />
  )
  expect(screen.getByRole('textbox')).toHaveValue('other')
})
