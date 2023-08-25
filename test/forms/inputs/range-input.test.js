import React from 'react'
import { render, screen } from '@testing-library/react'
import { RangeInput } from '../../../src/'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }

test('RangeInput hides the value label when `hideRangeValue` is `true`', () => {
  const props = { input, hideRangeValue: true, meta: {} }
  render(<RangeInput {...props} />)
  expect(screen.queryByText(input.value)).not.toBeInTheDocument()
})

test('RangeInput shows the value label when `hideRangeValue` is `false`', () => {
  const props = { input, hideRangeValue: false, meta: {} }
  render(<RangeInput {...props} />)
  expect(screen.queryByText(input.value)).toBeInTheDocument()
})

test('RangeInput sets the `min`, `max`, and `step` correctly', () => {
  const props = { input, min: 5, max: 50, step: 10, meta: {} }
  render(<RangeInput {...props} />)
  const rangeInput = screen.getByLabelText('Field')
  expect(rangeInput.getAttribute('min')).toEqual('5')
  expect(rangeInput.getAttribute('max')).toEqual('50')
  expect(rangeInput.getAttribute('step')).toEqual('10')
})

test('RangeInput has aria-describedby attribute when there is an input error', () => {
  const props = { input, meta: { touched: true, invalid: true } }
  render(<RangeInput {...props} />)
  expect(screen.getByLabelText('Field').getAttribute('aria-describedby')).toContain(name)
})

test('RangeInput does not receive invalid dom attributes', () => {
  const props = {
    input,
    meta: {},
    onClickLabel: () => 'foo',
  }

  render(<RangeInput {...props} />)
  expect(screen.getByLabelText('Field')).not.toHaveAttribute('onClickLabel')
})
