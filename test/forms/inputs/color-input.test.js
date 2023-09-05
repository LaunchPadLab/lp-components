import React, { useState } from 'react'
import { ColorInput } from '../../../src/'
import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const WrappedColorInput = (props) => {
  const [value, setValue] = useState('')

  const defaultProps = {
    input: {
      name: 'test',
      value,
      onChange: setValue,
      onBlur: () => null,
    },
    meta: {},
  }

  return <ColorInput {...defaultProps} {...props} />
}

test('ColorInput hex input adds hash to value', async () => {
  const user = userEvent.setup()

  render(<WrappedColorInput />)

  const input = screen.getByRole('textbox')
  await user.type(input, '000{Enter}')

  expect(input).toHaveValue('000')
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
  await act(() => user.click(input))
  expect(screen.getByRole('dialog')).toBeInTheDocument()

  await act(() => user.click(container))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
