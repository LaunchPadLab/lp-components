import React from 'react'
import { HiddenInput } from '../../../src/'
import { render, screen } from '@testing-library/react'

const name = 'my.hidden.input'
const value = 'foo'
const onChange = jest.fn()
const props = { input: { name, value, onChange }, meta: {} }

test('HiddenInput renders an input', () => {
  render(<HiddenInput {...props} />)
  const input = screen.getByRole('textbox', { hidden: true })

  expect(input).toBeInTheDocument()
  expect(input).not.toBeVisible()
})
