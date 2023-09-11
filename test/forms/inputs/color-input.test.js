import React, { useState } from 'react'
import { ColorInput } from '../../../src/'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const WrappedColorInput = ({ defaultValue='', ...rest }) => {
  const [value, setValue] = useState(defaultValue)

  const defaultProps = {
    input: {
      name: 'test',
      value,
      onChange: setValue,
      onBlur: () => null,
    },
    meta: {},
  }

  return <ColorInput {...defaultProps} {...rest} />
}

test('ColorInput hex input adds hash to value', async () => {
  const user = userEvent.setup()

  render(<WrappedColorInput />)

  const input = screen.getByRole('textbox')
  await user.type(input, '000{Enter}')

  expect(input).toHaveValue('000')
})

test('ColorInput hex input does not add hash to empty value', async () => {
  const user = userEvent.setup()

  render(<WrappedColorInput defaultValue="#000000" />)

  const input = screen.getByRole('textbox')
  await user.clear(input)

  expect(input).toHaveValue('')
})

test('ColorInput expands dropdown when hex input is focused', async () => {
  const user = userEvent.setup()

  render(<WrappedColorInput />)

  const input = screen.getByRole('textbox')
  await user.click(input)

  expect(screen.getByRole('dialog')).toBeInTheDocument()
})

test('ColorInput expands dropdown when ColorPicker is pressed', async () => {
  const user = userEvent.setup()

  render(<WrappedColorInput />)

  const input = screen.getByRole('button')
  await user.click(input)

  expect(screen.getByRole('dialog')).toBeInTheDocument()
})

test('ColorInput closes dropdown when clicked outside', async () => {
  const user = userEvent.setup()

  const { container } = render(<WrappedColorInput />)

  const input = screen.getByRole('textbox')
  await user.click(input)
  expect(screen.getByRole('dialog')).toBeInTheDocument()

  user.click(container)
  await waitForElementToBeRemoved(screen.queryByRole('dialog'))
})
