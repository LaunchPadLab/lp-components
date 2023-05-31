import React, { useState } from 'react'
import { DropdownCheckboxGroup } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const WrappedDropdownCheckboxGroup = (props) => {
  const [value, setValue] = useState(props.value || [])

  const options = [
    { key: 'First Option', value: '1' },
    { key: 'Second Option', value: '2' },
    { key: 'Third Option', value: '3' },
  ]

  const defaultProps = {
    input: {
      name: 'test',
      value: value,
      onChange: (e) => setValue(e)
    },
    meta: {},
    options: options,
  }

  return <DropdownCheckboxGroup {...defaultProps} {...props} />
}

test('DropdownCheckboxGroup adds checkbox value to select array when unselected option clicked', async () => {
  render(<WrappedDropdownCheckboxGroup />)

  const input = screen.getAllByRole('group')[0]
  const user = userEvent.setup()

  await user.click(input)

  const firstCheckbox = screen.getByLabelText('First Option')

  await user.click(firstCheckbox)

  expect(firstCheckbox).toBeChecked()

  const selectValueLabel = screen.getByText('1')
  expect(selectValueLabel).toBeTruthy
})

test('DropdownCheckboxGroup removes value to array when selected option clicked', async () => {

  render(<WrappedDropdownCheckboxGroup value={['1']} />)

  const input = screen.getAllByRole('group')[0]
  const user = userEvent.setup()

  await user.click(input)

  const firstCheckbox = screen.getByLabelText('First Option')

  await user.click(firstCheckbox)
  expect(firstCheckbox).not.toBeChecked()
  const selectValueLabel = screen.getByText('None')
  expect(selectValueLabel).toBeTruthy()
})
