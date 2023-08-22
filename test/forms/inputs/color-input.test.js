import React, { useState } from 'react'
import { ColorInput } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const WrappedColorInput = (props) => {
  const [value, setValue] = useState('')

  const defaultProps = {
    input: {
      name: 'test',
      value,
      onChange: setValue,
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
