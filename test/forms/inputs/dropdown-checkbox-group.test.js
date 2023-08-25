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
      onChange: setValue,
    },
    meta: {},
    options,
  }

  return <DropdownCheckboxGroup {...defaultProps} {...props} />
}

test('DropdownCheckboxGroup adds value to array when unselected option clicked', async () => {
  const user = userEvent.setup()

  render(<WrappedDropdownCheckboxGroup />)

  const select = screen.getAllByRole('group')[0]
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

test('DropdownCheckboxGroup removes value from array when selected option clicked', async () => {
  const user = userEvent.setup()

  render(<WrappedDropdownCheckboxGroup value={['1']} />)

  const select = screen.getAllByRole('group')[0]
  await user.click(select)

  const firstCheckbox = screen.getByLabelText('First Option')
  await user.click(firstCheckbox)

  expect(firstCheckbox).not.toBeChecked()

  const selectValueLabel = screen.getByText('None')
  expect(selectValueLabel).toBeInTheDocument()
})
