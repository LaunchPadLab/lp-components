import React from 'react'
import { SubmitButton } from '../../../src/'
import { render, screen } from '@testing-library/react'

test('SubmitButton adds type="submit" to button', () => {
  render(<SubmitButton>Hi</SubmitButton>)
  const button = screen.getByRole('button')

  expect(button).toHaveAttribute('type', 'submit')
})

test('SubmitButton passes down other props to button', () => {
  render(
    <SubmitButton pristine={true} variant="custom">
      Hi
    </SubmitButton>
  )
  const button = screen.getByRole('button')

  expect(button).toHaveAttribute('aria-disabled')
  expect(button).toHaveClass('button-custom')
})
