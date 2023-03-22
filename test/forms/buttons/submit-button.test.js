import React from 'react'
import { SubmitButton } from '../../../src/'
import { render, screen } from '@testing-library/react'

test('SubmitButton adds type="submit" to button', () => {
  render(
    <SubmitButton> Hi</SubmitButton>
  )
  expect(screen.getByRole('button').getAttribute("type")).toContain("submit")
})

test('SubmitButton passes down other props to button', () => {
  render(
    <SubmitButton pristine={true} variant="custom">
      {' '}
      Hi
    </SubmitButton>
  )
  screen.debug()
  expect(screen.getByRole('button')).toHaveAttribute('aria-disabled')
  expect(screen.getByRole('button')).toHaveClass('button-custom')
  // expect(button.props()['aria-disabled']).toBe(true)
  // expect(button.hasClass('button-custom')).toBe(true)
})
