import React from 'react'
import { shallow } from 'enzyme'
import { InputError } from '../../../src/'
import { render, screen } from '@testing-library/react'
import { within, logRoles } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

test('does not render when input is touched but not invalid', () => {
  // Does not render
  const { container } = render(<InputError error="test" invalid={false} touched={true} />)

  expect(container.firstChild).toBeNull()
})

test('renders when input is touched and invalid', () => {
  // Does not render
  const { container } = render(<InputError error="test" invalid={true} touched={true} />)

  expect(container.firstChild).toHaveTextContent('test')
})

test('formats error messages correctly', () => {
  // Single error
  const { container, rerender } = render(
    <InputError error="Foo" invalid={true} touched={true} />
  )
  expect(container.firstChild).toHaveTextContent('Foo')

  // Multiple errors
  rerender(<InputError error={["Foo", "Bar"]} invalid={true} touched={true} />)
  expect(container.firstChild).toHaveTextContent('Foo, Bar')
})

test('passes class to span element correctly', () => {
  const { container } = render(
    <InputError className="small" error="Foo" touched invalid />
  )

  expect(container.firstChild).toHaveClass('error-message')
  expect(container.firstChild).toHaveClass('small')
})

test('passes extra props to span element', async () => {
  let count = 0

  const onClick = () => count++

  const { container } = render(
    <InputError onClick={onClick} error="Foo" touched invalid />
  )

  const span = container.firstChild

  const user = userEvent.setup()

  await user.click(span)

  expect(count).toBe(1)
})

test('filters invalid props passed to span element', () => {
  const onClick = () => jest.fn()

  const { container } = render(
    <InputError
      onClick={onClick}
      error="Foo"
      test="test"
      data-testid="mock-input-error"
      touched
      invalid
    />
  )

  expect(container.firstChild).not.toHaveAttribute('touched')
})

test('is provided with an id containing the associated input name', () => {
  const inputName = 'test-name'
  const result = render(<InputError name={inputName} invalid touched />)
  const inputError = result.container.querySelector(`#${inputName}Error`)
  expect(inputError).not.toBeNull()
})
