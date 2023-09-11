import React, { useState } from 'react'
import { Checkbox } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const WrappedCheckbox = () => {
  const [value, setValue] = useState(false)

  const props = {
    input: {
      name: 'test',
      value: value,
      onChange: () => setValue(!value),
    },
    meta: {},
  }

  return <Checkbox {...props} />
}

test('Checkbox toggles value when clicked', async () => {
  const user = userEvent.setup()

  render(<WrappedCheckbox />)

  const checkbox = screen.getByRole('checkbox')

  expect(checkbox).not.toBeChecked()

  await user.click(checkbox)

  expect(checkbox).toBeChecked()

  await user.click(checkbox)

  expect(checkbox).not.toBeChecked()
})

test('Checkbox is checked with true value', async () => {
  const props = {
    input: {
      name: 'test',
      value: true,
      onChange: jest.fn(),
    },
    meta: {},
  }
  render(<Checkbox {...props} />)
  const checkbox = screen.getByRole('checkbox')

  expect(checkbox).toBeChecked()
})

test('Checkbox is not checked with false value', () => {
  const onChange = jest.fn()
  const props = {
    input: {
      name: 'test',
      value: false,
      onChange,
    },
    meta: {},
  }

  render(<Checkbox {...props} />)
  const checkbox = screen.getByRole('checkbox')

  expect(checkbox).not.toBeChecked()
})

test('Checkbox is given an aria-describedby attribute when there is an input error', () => {
  const name = 'test'
  const props = {
    input: {
      name,
      value: false,
    },
    meta: {
      touched: true,
      invalid: true,
    },
  }
  render(<Checkbox {...props} />)
  const checkbox = screen.getByRole('checkbox')

  expect(checkbox).toHaveAttribute('aria-describedby', 'testError')
})

test('Checkbox does not receive invalid dom attributes', () => {
  const props = {
    input: {
      name: 'test',
      value: false,
    },
    meta: {},
    onClickLabel: () => 'foo',
  }

  render(<Checkbox {...props} />)
  const checkbox = screen.getByRole('checkbox')

  expect(checkbox).not.toHaveAttribute('onClickLabel')
})
