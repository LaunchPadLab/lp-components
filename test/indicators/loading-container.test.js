import React from 'react'
import { LoadingContainer } from '../../src/'
import { render, screen } from '@testing-library/react'

test('LoadingContainer renders children', () => {
  const text = 'This text IS loading.'
  render(
    <LoadingContainer isLoading={true}>
      <div id="loading">{text}</div>
    </LoadingContainer>
  )
  expect(screen.getByText(text)).toBeInTheDocument()
})

test('LoadingContainer does not apply the is-loading class when isLoading is false', () => {
  render(<LoadingContainer isLoading={false} data-testid="1" />)
  expect(screen.getByTestId("1")).not.toHaveClass('is-loading')
})

test('LoadingContainer applies the is-loading class when isLoading is true', () => {
  render(<LoadingContainer isLoading={true} data-testid="1" />)
  expect(screen.getByTestId("1")).toHaveClass('is-loading')
})

test('LoadingContainer passes props', () => {
  render(<LoadingContainer isLoading={true} data-testid="1" aria-busy="true" />)
  expect(screen.getByTestId("1")).toHaveAttribute('aria-busy')
})
