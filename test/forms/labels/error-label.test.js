import React from 'react'
import { ErrorLabel } from '../../../src'
import { render, screen } from '@testing-library/react'

test('passes class to span element correctly', () => {
  render(<ErrorLabel className="small">Error!</ErrorLabel>)
  const label = screen.getByText('Error!')
  expect(label).toHaveClass('error-message', 'small')
})

test('passes extra props to span element', () => {
  render(<ErrorLabel data-test="foo">Error!</ErrorLabel>)
  expect(screen.getByText('Error!')).toHaveAttribute('data-test', 'foo')
})
