import React from 'react'
import { render, screen } from '@testing-library/react'
import { Input } from '../../../src/'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const input = { name, value, onChange }

test('Input defaults to text input', () => {
  const props = { input, meta: {} }
  render(<Input {...props} />)
  expect(screen.getByLabelText('Field')).toHaveAttribute('type', 'text')
})

test('Input contains div with class input-wrapper', () => {
  const props = { input, meta: {} }
  render(<Input {...props} />)
  expect(screen.getByLabelText('Field').parentElement).toHaveClass('input-wrapper')
})

test('Input renders children', () => {
  const Wrapped = () => <p> I'm a child component </p>
  const props = { input, meta: {} }
  render(
    <Input {...props}>
      <Wrapped />
    </Input>
  )
  expect(screen.getByText("I'm a child component")).toBeInTheDocument()
})

test('Input is given an aria-describedby attribute when there is an input error', () => {
  const props = { input, meta: { touched: true, invalid: true } }
  render(<Input {...props} />)
  expect(screen.getByLabelText('Field').getAttribute('aria-describedby')).toContain(name)
})

test('Input id defaults to name when no id is provided', () => {
  const props = { input, meta: {} }
  render(<Input {...props} />)
  expect(screen.getByLabelText('Field').id).toBe(name)
})

test('Input id is set when id is provided', () => {
  const props = { input, meta: {} }
  render(<Input {...props} id="testId" />)
  expect(screen.getByLabelText('Field').id).toBe('testId')
})

test('Input does not receive invalid dom attributes', () => {
  const props = {
    input,
    meta: {},
    onClickLabel: () => 'foo',
  }

  render(<Input {...props} />)
  expect(screen.getByLabelText('Field')).not.toHaveAttribute('onClickLabel')
})
