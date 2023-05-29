import React, { useState } from 'react'
import { mount } from 'enzyme'
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

  const input = screen.getByRole('textbox')

  const user = userEvent.setup()

  await user.click(input)

  await user.keyboard('{0}{0}{0}{Enter}');

  expect(input).toHaveValue('000')
})

test('ColorInput expands dropdown when hex input is focused', async () => {
  const { container } = render(<WrappedColorInput />)

  const input = screen.getByRole('textbox')

  const user = userEvent.setup()

  await user.click(input)

  expect(within(container).getByText('hex')).toBeTruthy()
})
