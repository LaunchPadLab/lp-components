import React from 'react'
import { ErrorLabel } from '../../../src'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('passes class to span element correctly', () => {
  render(<ErrorLabel className="small">Error!</ErrorLabel>)
  const label = screen.getByText('Error!')
  expect(label).toHaveClass('error-message', 'small')
})

test('passes extra props to span element', async () => {
  let count = 0
  const onClick = () => count++
  const user = userEvent.setup()

  render(<ErrorLabel onClick={onClick}>Error!</ErrorLabel>)

  await user.click(screen.getByText('Error!'))

  expect(count).toBe(1)
})
