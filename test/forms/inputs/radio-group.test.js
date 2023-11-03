import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RadioGroup } from '../../../src/'

const name = 'testGroup'
const formattedName = 'Test Group'

test('RadioGroup changes value when buttons are clicked', async () => {
  const user = userEvent.setup()
  const onChange = jest.fn()
  const props = {
    input: {
      name,
      value: '',
      onChange,
    },
    meta: {},
    options: ['Option 1', 'Option 2'],
  }
  render(<RadioGroup {...props} />)
  const radioOptions = screen.getAllByRole('radio')
  await user.click(radioOptions.at(0))
  expect(onChange).toHaveBeenCalledWith('Option 1')
  await user.click(radioOptions.at(1))
  expect(onChange).toHaveBeenCalledWith('Option 2')
})

test("RadioGroup's inputs all have the same name", () => {
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {},
    options: ['Option 1', 'Option 2'],
  }
  render(<RadioGroup {...props} />)
  const radioOptions = screen.getAllByRole('radio')
  expect(radioOptions.at(0)).toHaveAttribute('name', name)
  expect(radioOptions.at(1)).toHaveAttribute('name', name)
})

test("RadioGroup input has a value that matches the corresponding option's value", () => {
  const options = ['Option 1', 'Option 2']
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
    options,
  }
  render(<RadioGroup {...props} />)
  expect(screen.getByRole('radio', { name: options.at(0) })).toHaveAttribute(
    'value',
    options.at(0)
  )
  expect(screen.getByRole('radio', { name: options.at(1) })).toHaveAttribute(
    'value',
    options.at(1)
  )
})

test("RadioGroup has a legend with the input's name start-cased by default", () => {
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {},
    options: ['Option 1', 'Option 2'],
  }
  render(<RadioGroup {...props} />)
  expect(screen.getByRole('group', { name: formattedName })).toBeInTheDocument()
})

test('RadioGroup still has a legend when label is `false`', () => {
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {},
    options: ['Option 1', 'Option 2'],
    label: false,
  }
  render(<RadioGroup {...props} />)
  expect(
    screen.queryByRole('group', { name: formattedName })
  ).toBeInTheDocument()
})

test("RadioGroup has a legend with the group's label (when provided)", () => {
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {},
    label: 'Different Name',
    options: ['Option 1', 'Option 2'],
  }
  render(<RadioGroup {...props} />)
  expect(
    screen.getByRole('group', { name: 'Different Name' })
  ).toBeInTheDocument()
})

test('RadioGroup does not pass down class name', () => {
  const props = {
    input: {
      name: 'test',
      value: '',
    },
    meta: {},
    options: ['Option 1'],
    className: 'custom-radio',
  }
  render(<RadioGroup {...props} />)
  expect(screen.getByRole('group', { name: 'Test' })).toHaveClass(
    'custom-radio'
  )
  expect(screen.getByRole('radio')).not.toHaveClass('custom-radio')
})

test('RadioGroup passes down props to children', () => {
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {},
    options: ['Option 1', 'Option 2'],
    className: 'custom-radio-group',
    'data-test': 'true',
    radioInputProps: { className: 'custom-radio-input' },
  }
  render(<RadioGroup {...props} />)
  screen.getAllByRole('radio').forEach((el) => {
    expect(el).toHaveClass('custom-radio-input')
    expect(el).toHaveAttribute('data-test', 'true')
  })
})

describe('RadioGroup', () => {
  test('does not show required indicator when no custom required indicator provided', () => {
    const props = {
      input: {
        name,
        value: '',
      },
      meta: {},
      required: true,
    }

    render(<RadioGroup {...props} />)
    expect(screen.getByText(formattedName).textContent).toEqual(formattedName)
  })

  test('shows custom indicator when required true and custom requiredIndicator provided', () => {
    const props = {
      input: {
        name,
        value: '',
      },
      meta: {},
      required: true,
      requiredIndicator: '*',
    }
    render(<RadioGroup {...props} />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  test('hides custom indicator when required false and custom requiredIndicator provided', () => {
    const props = {
      input: {
        name,
        value: '',
      },
      meta: {},
      required: false,
      requiredIndicator: '*',
    }
    render(<RadioGroup {...props} />)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  test('shows hint when hint provided', () => {
    const props = {
      input: {
        name,
        value: '',
      },
      meta: {},
      hint: 'hint',
    }
    render(<RadioGroup {...props} />)
    expect(screen.getByText(formattedName)).toHaveTextContent('hint')
  })
})
