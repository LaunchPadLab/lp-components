import React from 'react'
import { render, screen } from '@testing-library/react'
import { within } from '@testing-library/dom'
import { Select } from '../../../src/'

const DEFAULT_PLACEHOLDER = 'Select'
const onChange = () => {}

test('Select adds string options to select tag', () => {
  const OPTION = 'MY OPTION'
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
    options: [OPTION],
    placeholder: '',
  }
  render(<Select {...props} />)
  expect(screen.getByRole('option')).toHaveValue(OPTION)
})

test('Select adds object options to select tag', () => {
  const KEY = 'MY KEY'
  const VALUE = 'MY OPTION'
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
    options: [{ key: KEY, value: VALUE }],
    placeholder: '',
  }
  render(<Select {...props} />)
  expect(screen.getByRole('option', { name: KEY })).toHaveValue(VALUE)
})

test('Select adds placeholder option to select tag', () => {
  const PLACEHOLDER = 'MY PLACEHOLDER'
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
    options: [],
    placeholder: PLACEHOLDER,
  }
  render(<Select {...props} />)
  expect(screen.getByRole('option', { name: PLACEHOLDER })).toHaveValue('')
})

test('Select enables the placeholder option to be selected correctly', () => {
  const PLACEHOLDER = 'MY PLACEHOLDER'
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
    options: [],
    placeholder: PLACEHOLDER,
    enablePlaceholderOption: true,
  }
  render(<Select {...props} />)
  expect(screen.getByRole('option', { name: PLACEHOLDER })).toBeEnabled()
})

test('Select has a disabled placeholder by default', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    options: [],
    meta: {},
  }
  render(<Select {...props} />)
  expect(
    screen.getByRole('option', { name: DEFAULT_PLACEHOLDER })
  ).toBeDisabled()
})

test('Select renders option groups correctly', () => {
  const options = { name: 'groupName', options: ['testOption'] }
  const props = {
    input: {
      name: 'test',
      value: '',
      onChange,
    },
    meta: {},
    optionGroups: [options],
    placeholder: '',
  }
  render(<Select {...props} />)
  const optionGroup = screen.getByRole('group', { name: options.name })
  expect(
    within(optionGroup).getByRole('option', { name: 'testOption' })
  ).toBeInTheDocument()
})

test('Select adds an aria-describedby attribute when there is an input error', () => {
  const OPTION = 'MY OPTION'
  const name = 'test'
  const props = {
    input: {
      name,
      value: '',
      onChange,
    },
    meta: {
      touched: true,
      invalid: true,
    },
    options: [OPTION],
  }
  render(<Select {...props} />)
  expect(
    screen.getByRole('combobox').getAttribute('aria-describedby')
  ).toContain(name)
})

test('Select does not receive invalid dom attributes', () => {
  const OPTION = 'MY OPTION'
  const name = 'test'
  const props = {
    input: {
      name,
      value: '',
      onChange,
    },
    meta: {},
    options: [OPTION],
    onClickLabel: () => 'foo',
  }

  render(<Select {...props} />)
  expect(screen.getByRole('combobox')).not.toHaveAttribute('onClickLabel')
})
