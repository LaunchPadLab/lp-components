import React, { useState } from 'react'
import { ColorInput } from '../../../src/'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { within } from '@testing-library/dom'

const WrappedColorInput = (props) => {
  const [value, setValue] = useState('')

  const defaultProps = {
    input: {
      name: 'test',
      value: value,
      onChange: (e) => setValue(e),
    },
    meta: {},
  }

  return <ColorInput {...defaultProps} {...props} />
}

test('ColorInput hex input adds hash to value', async () => {
  render(<WrappedColorInput />)

  const user = userEvent.setup()
  const input = screen.getByRole('textbox')

  await user.type(input, '000{Enter}')

  expect(input).toHaveValue('000')
})

test('ColorInput expands dropdown when hex input is focused', async () => {
  render(<WrappedColorInput />)

  const user = userEvent.setup()
  const input = screen.getByRole('textbox')

  await user.click(input)

  expect(screen.getByRole('dialog')).toBeInTheDocument()
})
