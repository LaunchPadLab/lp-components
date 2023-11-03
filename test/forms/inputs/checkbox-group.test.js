import React, { useState } from 'react'
import { CheckboxGroup } from '../../../src/'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const name = 'testGroup'
const formattedName = 'Test Group'

const WrappedCheckboxGroup = (props) => {
  const [value, setValue] = useState(props.value || [])

  const options = [
    { key: 'First Option', value: '1' },
    { key: 'Second Option', value: '2' },
    { key: 'Third Option', value: '3' },
  ]

  const defaultProps = {
    input: {
      name,
      value,
      onChange: setValue,
    },
    meta: {},
    options,
  }

  return <CheckboxGroup {...defaultProps} {...props} />
}

test('CheckboxGroup adds value to array when unselected option clicked', async () => {
  const user = userEvent.setup()

  render(<WrappedCheckboxGroup />)

  const checkbox1 = screen.getByRole('checkbox', { name: 'First Option' })
  const checkbox2 = screen.getByRole('checkbox', { name: 'Second Option' })
  const checkbox3 = screen.getByRole('checkbox', { name: 'Third Option' })

  await user.click(checkbox2)
  await user.click(checkbox3)

  expect(checkbox1).not.toBeChecked()
  expect(checkbox2).toBeChecked()
  expect(checkbox3).toBeChecked()
})

test('CheckboxGroup removes value from array when selected option clicked', async () => {
  const user = userEvent.setup()

  render(<WrappedCheckboxGroup />)

  const checkbox2 = screen.getByRole('checkbox', { name: 'Second Option' })
  await user.click(checkbox2)

  expect(checkbox2).toBeChecked()

  await user.click(checkbox2)

  expect(checkbox2).not.toBeChecked()
})

test("CheckboxGroup has a legend with the group's name by default", () => {
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {},
  }
  render(<CheckboxGroup {...props} />)

  expect(screen.getByText(formattedName)).toBeInTheDocument()
})

test("CheckboxGroup has a legend with the group's label (when provided)", () => {
  const props = {
    input: {
      name,
      value: '',
    },
    label: 'Different Name',
    meta: {},
  }
  render(<CheckboxGroup {...props} />)

  expect(screen.getByText('Different Name')).toBeInTheDocument()
})

test('CheckboxGroup does not pass class to children', () => {
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {},
    options: ['TOGGLED_OPTION'],
    className: 'custom-class',
  }
  render(<CheckboxGroup {...props} />)

  const checkboxGroup = screen.getByRole('group', { name: formattedName })
  const checkbox = screen.getByRole('checkbox')

  expect(checkboxGroup).toHaveClass('custom-class')
  expect(checkbox).not.toHaveClass('custom-class')
})

test('CheckboxGroup passes down props to children', () => {
  const props = {
    input: {
      name,
      value: '',
    },
    meta: {},
    options: ['TOGGLED_OPTION'],
    className: 'custom-group-class',
    checkboxInputProps: {
      className: 'custom-input-class',
    },
  }
  render(<CheckboxGroup {...props} />)

  const checkboxGroup = screen.getByRole('group', { name: formattedName })
  const checkbox = screen.getByRole('checkbox')

  expect(checkboxGroup).toHaveClass('custom-group-class')
  expect(checkbox).not.toHaveClass('custom-group-class')
  expect(checkbox).toHaveClass('custom-input-class')
})

test('CheckboxGroup with dropdown = true adds value to array when unselected option clicked', async () => {
  const user = userEvent.setup()

  render(<WrappedCheckboxGroup dropdown={true} />)

  const select = screen.getByRole('button')
  await user.click(select)

  const firstCheckbox = screen.getByLabelText('First Option')
  await user.click(firstCheckbox)

  const thirdCheckbox = screen.getByLabelText('Third Option')
  await user.click(thirdCheckbox)

  expect(firstCheckbox).toBeChecked()
  expect(thirdCheckbox).toBeChecked()

  const selectValueLabel = screen.getByText('3, 1')
  expect(selectValueLabel).toBeInTheDocument()
})

test('CheckboxGroup with dropdown = true removes value from array when selected option clicked', async () => {
  const user = userEvent.setup()

  render(<WrappedCheckboxGroup value={['1']} dropdown={true} />)

  const select = screen.getByRole('button')
  await user.click(select)

  const firstCheckbox = screen.getByLabelText('First Option')
  await user.click(firstCheckbox)

  expect(firstCheckbox).not.toBeChecked()

  const selectValueLabel = screen.getByText('None')
  expect(selectValueLabel).toBeInTheDocument()
})

test('CheckboxGroup with dropdown = true sets menu no longer active when clicked outside', async () => {
  const user = userEvent.setup()

  render(<WrappedCheckboxGroup value={['1']} dropdown={true} />)

  const select = screen.getByRole('button')
  await user.click(select)

  expect(select.nextSibling).toHaveClass('options', 'is-active')

  const fieldset = screen.getAllByRole('group').at(0)

  user.click(fieldset)
  await waitFor(() => {
    expect(select.nextSibling).not.toHaveClass('is-active')
  })
})
describe('CheckboxGroup', () => {
  test('does not show required indicator when no custom required indicator provided', () => {
    render(<WrappedCheckboxGroup required />)
    expect(screen.getByText(formattedName).textContent).toEqual(formattedName)
  })

  test('shows custom indicator when required true and custom requiredIndicator provided', () => {
    render(<WrappedCheckboxGroup required requiredIndicator={'*'} />)
    expect(screen.getByText('*')).toBeInTheDocument()
  })

  test('hides custom indicator when required false and custom requiredIndicator provided', () => {
    render(<WrappedCheckboxGroup required={false} requiredIndicator={'*'} />)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  test('shows hint when hint provided', () => {
    render(<WrappedCheckboxGroup hint="hint" />)
    expect(screen.getByText(formattedName)).toHaveTextContent('hint')
  })
})
