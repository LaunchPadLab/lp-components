import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mount } from 'enzyme'
import { Switch } from '../../../src'

test('Switch toggles value when clicked', async () => {
  const onChange = jest.fn()
  const user = userEvent.setup()
  const props = {
    input: {
      name: 'test',
      value: false,
      onChange,
    },
    meta: {},
  }
  render(<Switch {...props} />)
  await user.click(screen.getByLabelText('Test'))
  const newValue = onChange.mock.calls[0][0]
  expect(newValue).toEqual(true)
})

test('Switch is given an aria-describedby attribute when there is an input error', () => {
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
  render(<Switch {...props} />)
  expect(screen.getByLabelText('Test').getAttribute('aria-describedby')).toContain(name)
})
