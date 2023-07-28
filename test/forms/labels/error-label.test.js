import React from 'react'
import { shallow } from 'enzyme'
import { ErrorLabel } from '../../../src'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('passes class to span element correctly', () => {
  render(<ErrorLabel className="small">Error!</ErrorLabel>)
  const label = screen.getByText('Error!')
  expect(label).toHaveClass('error-message')
  expect(label).toHaveClass('small')
})

test('passes extra props to span element', async () => {
  let count = 0

  const onClick = () => count++

  render(<ErrorLabel onClick={onClick}>Error!</ErrorLabel>)

  const label = screen.getByText('Error!')

  const user = userEvent.setup()

  await user.click(label)

  expect(count).toBe(1)
})
