import React, { useState } from 'react'
import { CheckboxGroup } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/dom'

const WrappedCheckboxGroup = (props) => {
  const [value, setValue] = useState([])

  const options = [
    { key: 'First Option', value: '1' },
    { key: 'Second Option', value: '2' },
    { key: 'Third Option', value: '3' },
  ]

  const defaultProps = {
    input: {
      name: 'test',
      value: value,
      onChange: (e) => setValue(e),
    },
    meta: {},
    options: options,
  }

  return <CheckboxGroup {...defaultProps} {...props} />
}

test('CheckboxGroup adds value to array when unselected option clicked', async () => {

  render(<WrappedCheckboxGroup />)

  const checkbox1 = screen.getByRole('checkbox', { name: 'First Option' })
  const checkbox2 = screen.getByRole('checkbox', { name: 'Second Option' })
  const checkbox3 = screen.getByRole('checkbox', { name: 'Third Option' })
  const user = userEvent.setup()

  await user.click(checkbox2);
  await user.click(checkbox3);

  expect(checkbox1).not.toBeChecked()
  expect(checkbox2).toBeChecked()
  expect(checkbox3).toBeChecked()
})

test('CheckboxGroup removes value to array when selected option clicked', async () => {
  // const props = {
  //   input: {
  //     name: 'testGroup',
  //     value: ['2'],
  //   },
  //   meta: {},
  // }
  render(<WrappedCheckboxGroup />)

  const checkbox2 = screen.getByRole('checkbox', { name: 'Second Option' })

  const user = userEvent.setup()

  await user.click(checkbox2);

  expect(checkbox2).toBeChecked()

  await user.click(checkbox2);

  expect(checkbox2).not.toBeChecked()
})

test("CheckboxGroup has a legend with the group's name by default", () => {
  const props = {
    input: {
      name: 'testGroup',
      value: '',
    },
    meta: {},
  }
  render(<CheckboxGroup {...props} />)
  expect(within(screen.getByRole('group')).getByText('Test Group')).toBeTruthy()
})

test("CheckboxGroup has a legend with the group's label (when provided)", () => {
  const props = {
    input: {
      name: 'testGroup',
      value: '',
    },
    label: 'Checkbox Group',
    meta: {},
  }
  render(<CheckboxGroup {...props} />)
  expect(within(screen.getByRole('group')).getByText('Checkbox Group')).toBeTruthy()
})

test('CheckboxGroup does not pass class to children', () => {
  const props = {
    input: {
      name: 'testGroup',
      value: '',
    },
    meta: {},
    options: ['TOGGLED_OPTION'],
    className: 'custom-class',
  }
  const { container } = render(<CheckboxGroup {...props} />)

  // make sure fieldset has custom-class
  const checkboxGroup = screen.getByRole('group', { name: 'Test Group' })
  expect(checkboxGroup).toHaveClass('custom-class')

  // make sure there is no class of custom-class within fieldset
  expect(container.getElementsByClassName('custom-class').length).toBe(1)
})

test('CheckboxGroup passes down props to children', () => {
  const props = {
    input: {
      name: 'testGroup',
      value: '',
    },
    meta: {},
    options: ['TOGGLED_OPTION'],
    className: 'custom-group-class',
    checkboxInputProps: {
      className: 'custom-input-class',
    },
  }
  const { container } = render(<CheckboxGroup {...props} />)

  // make sure fieldset has custom-class
  const checkboxGroup = screen.getByRole('group', { name: 'Test Group' })
  expect(checkboxGroup).toHaveClass('custom-group-class')

  // make sure there is no class of custom-class within fieldset
  expect(container.getElementsByClassName('custom-input-class').length).toBe(2)
})
