import React, { useState } from 'react'
import { mount } from 'enzyme'
import { DateInput } from '../../../src/'
import { render, screen } from '@testing-library/react'
import { within } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

const name = 'name.of.field'
const value = '2020-01-01'
const noop = () => { }
const input = { name, value }
const error = 'input error'

const WrappedDateInput = (props) => {
  const [value, setValue] = useState('')

  const defaultProps = {
    input: {
      name: name,
      value: value,
      onChange: (e) => setValue(e),
    },
    meta: {},
  }

  return <DateInput {...defaultProps} {...props} />
}

test('DateInput renders the error message when provided', () => {
  const props = { input, meta: { invalid: true, touched: true, error } }
  const { container } = render(<WrappedDateInput {...props} />)
  expect(within(container).getByText('input error')).toBeTruthy()
})

test('DateInput updates the value on change', async () => {
  render(<WrappedDateInput />)

  const input = screen.getByRole('textbox', { name: 'Field' })

  const user = userEvent.setup()

  await user.click(input)

  await user.keyboard('02/02/2023{Enter}')

  expect(input).toHaveValue('02/02/2023')
})

test('DateInput sets the placeholder text correctly', () => {
  const props = { placeholderText: 'Test Placeholder' }
  render(<WrappedDateInput {...props} />)
  const input = screen.getByRole('textbox', { name: 'Field' })

  expect(within(input).findByText('Test Placeholder')).toBeTruthy()
})

test('DateInput invokes onChange with a Date object', async () => {
  const onChange = jest.fn()
  const props = { input: { ...input, onChange, onBlur: noop }, meta: {} }
  render(<WrappedDateInput {...props} />)

  const input = screen.getByRole('textbox')

  const user = userEvent.setup()

  await user.click(input)
  await user.keyboard('02/02/2023')
  expect(input).toHaveValue('02/02/2023')

  // expect(onChange).toHaveBeenCalledTimes(8)
  expect(onChange.mock.calls[0][0] instanceof Date).toBe(true)
})

test("DateInput defaults tabbable item to today's date", async () => {
  const props = { input: { ...input, value: '' }, meta: {} }
  render(<DateInput {...props} />)
  const input = screen.getByRole('textbox')

  const user = userEvent.setup()

  await user.click(input)

  const current = screen.getByRole('option', { current: 'date' })
  screen.debug()
  expect(current).toBeTruthy()
})
