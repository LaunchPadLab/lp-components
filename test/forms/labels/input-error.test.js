import React from 'react'
import { InputError } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('does not render when input is touched but not invalid', () => {
  render(<InputError error="test" invalid={false} touched={true} data-testid="1" />)
  expect(screen.queryByTestId('1')).not.toBeInTheDocument()
})

test('does not render when input is invalid but not touched', () => {
  render(<InputError error="test" invalid={true} touched={false} data-testid="1" />)
  expect(screen.queryByTestId('1')).not.toBeInTheDocument()
})

test('renders when input is touched and invalid', () => {
  render(<InputError error="test" invalid={true} touched={true} />)
  expect(screen.getByText('test')).toBeInTheDocument()
})

test('formats error messages correctly', () => {
  // Single error
  const { rerender } = render(
    <InputError error="Foo" invalid={true} touched={true} />
  )
  expect(screen.getByText('Foo')).toBeInTheDocument()

  // Multiple errors
  rerender(<InputError error={["Foo", "Bar"]} invalid={true} touched={true} />)
  expect(screen.getByText('Foo, Bar')).toBeInTheDocument()
})

test('passes class to span element correctly', () => {
  render(
    <InputError className="small" error="Foo" touched invalid data-testid="1" />
  )
  expect(screen.getByText('Foo')).toHaveClass('error-message', 'small')
})

test('passes extra props to span element', () => {
  render(
    <InputError data-testid="foo-error" error="Required" touched invalid />
  )

  expect(screen.getByTestId('foo-error')).toBeInTheDocument()
})

test('filters invalid props passed to span element', () => {
  render(
    <InputError
      error="Foo"
      test="test"
      touched
      invalid
    />
  )

  expect(screen.getByText('Foo')).not.toHaveAttribute('test')
})

test('is provided with an id containing the associated input name', () => {
  const inputName = 'test-name'
  render(<InputError error="Foo" name={inputName} invalid touched />)
  const inputError = screen.getByText('Foo')
  expect(inputError.getAttribute('id')).toContain(inputName)
})