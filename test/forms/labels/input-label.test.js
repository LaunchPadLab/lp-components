import React from 'react'
import { InputLabel } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const name = 'person.firstName'
const formattedName = 'First Name'

test('when label is false - does not render a label', () => {
  render(<InputLabel name={name} label={false} />)
  expect(screen.queryByText(formattedName)).not.toBeInTheDocument()
})

test('when label not provided - renders a label with content equal to formatted input name', () => {
  render(<InputLabel name={name} />)
  expect(screen.getByText(formattedName)).toBeInTheDocument()
})

test('when label provided - renders a label with content equal to string', () => {
  render(<InputLabel name={name} label="foo" />)
  expect(screen.getByText('foo')).toBeInTheDocument()
})

test('when children are provided, renders a label with content equal to children', () => {
  render(
    <InputLabel name={name}>
      Are you sure?
    </InputLabel>
  )

  expect(screen.getByText('Are you sure?')).toBeInTheDocument()
})

test('when children are provided, renders a label with custom interactions intact', async () => {
  const user = userEvent.setup()
  const onClick = jest.fn()
  render(
    <InputLabel name={name}>
      Are you{' '}
      <span data-testid="click" onClick={onClick}>
        sure
      </span>
      ?
    </InputLabel>
  )

  await user.click(screen.getByTestId('click'))

  expect(onClick).toHaveBeenCalled()
})

test('when hint provided - shows hint', () => {
  render(<InputLabel name={name} hint="hint" />)
  expect(screen.getByText(formattedName)).toHaveTextContent('hint')
})

test('when tooltip provided - shows tooltip trigger', () => {
  render(<InputLabel name={name} tooltip="tooltip" />)
  expect(screen.getByText(formattedName).nextSibling).toHaveClass('tooltip-trigger')
})

test('when tooltip provided - toggle tooltip', async () => {
  const user = userEvent.setup()
  const tooltipText = 'tooltippy'
  render(<InputLabel name={name} tooltip={tooltipText} />)
  const trigger = screen.queryByText(formattedName).nextSibling
  const content = screen.queryByText(tooltipText)

  expect(content).not.toHaveClass('is-active')
  await user.click(trigger)
  expect(content).toHaveClass('is-active')
  await user.click(trigger)
  expect(content).not.toHaveClass('is-active')
})

test('when no custom required indicator provided, do not show required indicator', () => {
  render(<InputLabel name={name} required />)
  expect(screen.getByText(formattedName).textContent).toEqual(formattedName)
})

test('when required true and custom requiredIndicator provided, show custom indicator', () => {
  render(
    <InputLabel name={name} required requiredIndicator={'*'} />
  )
  expect(screen.getByText('*')).toBeInTheDocument()
})

test('when required false and custom requiredIndicator provided, hide custom indicator', () => {
  render(
    <InputLabel name={name} required={false} requiredIndicator={'*'} />
  )
  expect(screen.queryByText('*')).not.toBeInTheDocument()
})

test('when id is _not_ provided - renders a label associated to the input name', () => {
  render(<InputLabel name={name} label="foo" />)
  expect(screen.getByText('foo')).toHaveAttribute('for', name)
})

test('when id is provided - renders a label associated to the input id', () => {
  const id = 'testId'
  render(<InputLabel name={name} id={id} label="foo" />)
  expect(screen.getByText('foo')).toHaveAttribute('for', id)
})

test('can accept a custom class name', () => {
  render(<InputLabel name={name} className="foo" />)
  expect(screen.getByText(formattedName)).toHaveClass('foo')
})
