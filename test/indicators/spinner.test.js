import React from 'react'
import { render, screen } from '@testing-library/react'
import { Spinner } from '../../src/'

test('Spinner has a defined role', () => {
  render(<Spinner />)
  expect(screen.getByRole('progressbar')).toBeInTheDocument()
})

test('Spinner can have a custom className', () => {
  render(<Spinner className="custom" />)
  expect(screen.getByRole('progressbar')).toHaveClass('custom')
})
