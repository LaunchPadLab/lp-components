import React from 'react'
import { render, screen } from '@testing-library/react'
import { LabeledField } from '../../../src/'

test('wraps children in fieldset', () => {
  const Wrapped = () => <input name="test" />
  const props = { input: { name: 'foo' }, meta: {} }
  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  const fieldset = screen.getByRole('group')
  expect(fieldset).toBeInTheDocument()
  expect(fieldset).not.toHaveClass('error')
})

test('adds error class when touched and invalid', () => {
  const Wrapped = () => <input name="test" />
  const props = {
    input: { name: 'foo' },
    meta: { touched: true, invalid: true },
  }
  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  expect(screen.getByRole('group')).toHaveClass('error')
})

test('adds disabled class when disabled', () => {
  const Wrapped = () => <input name="test" />
  const props = { input: { name: 'foo' }, meta: {}, disabled: true }
  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  expect(screen.getByRole('group')).toHaveClass('disabled')
})

test('adds InputLabel and InputError', () => {
  const Wrapped = () => <input name="test" />
  const props = {
    input: { name: 'foo' },
    meta: { touched: true, invalid: true },
    error: "Required"
  }
  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  // InputLabel
  expect(screen.getByText('Foo')).toBeInTheDocument()
  // InputError
  expect(screen.getByText('Required')).toBeInTheDocument()
})

test('hides error label with hideErrorLabel option', () => {
  const Wrapped = () => <input name="test" />
  const props = {
    input: { name: 'foo' },
    meta: { touched: true, invalid: true },
    error: 'Required',
    hideErrorLabel: true,
  }
  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  expect(screen.queryByText('Required')).not.toBeInTheDocument()
})

test('adds a custom label component', () => {
  const Wrapped = () => <input name="test" />
  const LabelComponent = () => <label>This is a custom label</label>
  const props = {
    input: {
      name: 'foo',
    },
    meta: {},
    labelComponent: LabelComponent,
  }

  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  expect(screen.getByText('This is a custom label')).toBeInTheDocument()
})

test('passes custom props to a custom label component', () => {
  const Wrapped = () => <input name="test" />
  // eslint-disable-next-line
  const LabelComponent = ({ customHint }) => (
    <label>
      This is a custom label<span>{customHint}</span>
    </label>
  )
  const props = {
    input: {
      name: 'foo',
    },
    meta: {},
    customHint: 'Hi!',
    labelComponent: LabelComponent,
  }

  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  expect(screen.getByText(props.customHint)).toBeInTheDocument()
})

test('considers a custom label component to have higher precedence than a label prop', () => {
  const Wrapped = () => <input name="test" />
  const LabelComponent = () => <label>This is a custom label</label>
  const props = {
    input: {
      name: 'foo',
    },
    label: 'Standard Label',
    meta: {},
    labelComponent: LabelComponent,
  }

  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  expect(screen.getByText('This is a custom label')).toBeInTheDocument()
  expect(screen.queryByText('Standard Label')).not.toBeInTheDocument()
})

test('adds a custom error component', () => {
  const Wrapped = () => <input name="test" />
  const ErrorComponent = () => (
    <span className="error">This is a custom error message</span>
  )
  const props = {
    input: {
      name: 'foo',
    },
    meta: {},
    errorComponent: ErrorComponent,
  }

  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  expect(screen.getByText('This is a custom error message')).toBeInTheDocument()
})

test('passes custom props to a custom error component', () => {
  const Wrapped = () => <input name="test" />
  // eslint-disable-next-line
  const ErrorComponent = ({ customHint }) => (
    <span className="error">
      This is a custom error message<span>{customHint}</span>
    </span>
  )
  const props = {
    input: {
      name: 'foo',
    },
    meta: {},
    errorComponent: ErrorComponent,
    customHint: 'Hi!',
  }

  render(
    <LabeledField {...props}>
      <Wrapped />
    </LabeledField>
  )
  expect(screen.getByText(props.customHint)).toBeInTheDocument()
})
