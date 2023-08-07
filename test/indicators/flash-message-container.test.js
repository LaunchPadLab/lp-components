import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/dom'
import { FlashMessageContainer } from '../../src'

const successMessage = {
  id: '0',
  message: 'Success!',
  isError: false,
  props: {
    'data-testid': 'success'
  },
}
const failureMessage = {
  id: '1',
  message: 'Failure!',
  isError: true,
  props: {
    'data-testid': 'failure'
  },
}

test('FlashMessageContainer displays all provided flash messages', () => {
  render(
    <FlashMessageContainer messages={[successMessage, failureMessage]} />
  )

  expect(screen.getByText(successMessage.message)).toBeInTheDocument()
  expect(screen.getByText(failureMessage.message)).toBeInTheDocument()
})

test('FlashMessageContainer passes down additional props to each message', () => {
  render(
    <FlashMessageContainer
      messages={[successMessage, failureMessage]}
      data-test="flash"
    />
  )
  expect(screen.getByTestId('success')).toHaveAttribute('data-test', 'flash')
  expect(screen.getByTestId('failure')).toHaveAttribute('data-test', 'flash')
})

test('FlashMessageContainer props get overridden by message props', () => {
  const specialFailureMessage = {
    ...failureMessage,
    props: { ...failureMessage.props, 'data-test': 'error-flash' },
  }
  render(
    <FlashMessageContainer
      messages={[successMessage, specialFailureMessage]}
      data-test="flash"
    />
  )
  expect(screen.getByTestId('success')).toHaveAttribute('data-test', 'flash')
  expect(screen.getByTestId('failure')).toHaveAttribute('data-test', 'error-flash')
})

test('FlashMessageContainer onDismiss gets invoked with message', async () => {
  const onDismiss = jest.fn()
  const user = userEvent.setup()

  render(
    <FlashMessageContainer
      messages={[successMessage, failureMessage]}
      onDismiss={onDismiss}
    />
  )

  await user.click(within(screen.getByTestId('success')).getByRole('button', { name: 'Dismiss' }))

  expect(onDismiss).toHaveBeenCalledTimes(1)
  expect(onDismiss).toHaveBeenCalledWith(successMessage)
})
