import React from 'react'
import { render, screen } from '@testing-library/react'
import { FlashMessage } from '../../src/'

test('FlashMessage only shows dismiss button when callback is provided', () => {
  render(<FlashMessage>Success!</FlashMessage>)
  expect(screen.queryByRole('button')).not.toBeInTheDocument()
  render(
    <FlashMessage
      onDismiss={() => {
        /* do something */
      }}
    >
      Success!
    </FlashMessage>
  )
  expect(screen.getByRole('button')).toBeInTheDocument()
})

test('FlashMessage dismiss button includes label for screenreaders', () => {
  render(
    <FlashMessage
      onDismiss={() => {
        /* do something */
      }}
    >
      Success!
    </FlashMessage>
  )
  expect(screen.getByLabelText('Dismiss')).toBeInTheDocument()
})

test('FlashMessage sets class based on isError prop', () => {
  render(<FlashMessage data-testid="1">Success!</FlashMessage>)
  const successMessage = screen.getByTestId("1")
  expect(successMessage).toHaveClass('success')
  expect(successMessage).not.toHaveClass('failure')

  render(<FlashMessage isError data-testid="2">Failure!</FlashMessage>)
  const errorMessage = screen.getByTestId("2")
  expect(errorMessage).not.toHaveClass('success')
  expect(errorMessage).toHaveClass('failure')
})
