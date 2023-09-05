import React, { useState } from 'react'
import { DateInput } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const name = 'name.of.field'
const value = '2020-01-01'
const noop = () => {}
const input = { name, value }
const error = 'input error'

const WrappedDateInput = (props) => {
  const [value, setValue] = useState('')

  const defaultProps = {
    input: {
      name: name,
      value: value,
      onChange: setValue,
      onBlur: noop,
    },
    meta: {},
  }

  return <DateInput {...defaultProps} {...props} />
}

test('DateInput renders the error message when provided', () => {
  const props = { input, meta: { invalid: true, touched: true, error } }
  render(<WrappedDateInput {...props} />)

  expect(screen.getByText('input error')).toBeInTheDocument()
})

test('DateInput updates the value on change', async () => {
  const user = userEvent.setup()

  render(<WrappedDateInput />)

  const input = screen.getByRole('textbox', { name: 'Field' })
  await user.type(input, '02/02/2023{Enter}')

  expect(input).toHaveValue('02/02/2023')
})

test('DateInput sets the placeholder text correctly', () => {
  const props = { placeholderText: 'Test Placeholder' }
  render(<WrappedDateInput {...props} />)

  expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument()
})

test('DateInput invokes onChange with a Date object', async () => {
  const user = userEvent.setup()
  const onChange = jest.fn()
  const props = { input: { ...input, onChange, onBlur: noop }, meta: {} }

  render(<WrappedDateInput {...props} />)

  await user.click(screen.getByRole('textbox'))

  const option = screen
    .getAllByRole('option', { selected: false, hidden: false })
    .at(0)
  await user.click(option)

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith(expect.any(Date))
})

test("DateInput defaults tabbable item to today's date", async () => {
  const user = userEvent.setup()
  const props = { input: { ...input, value: '' }, meta: {} }

  render(<DateInput {...props} />)

  const dateInput = screen.getByRole('textbox')
  await user.click(dateInput)
  const current = screen.getByRole('option', { current: 'date' })

  expect(current).toHaveProperty('tabIndex', 0)
})

test('DateInput sets empty input to an empty string', async () => {
  const user = userEvent.setup()
  const onChange = jest.fn()
  const props = { input: { ...input, onChange, onBlur: noop }, meta: {} }

  render(<WrappedDateInput {...props} />)

  await user.clear(screen.getByRole('textbox'))

  expect(onChange).toHaveBeenCalledTimes(1)
  expect(onChange).toHaveBeenCalledWith('')
})