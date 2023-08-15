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
})

test('HiddenInput renders a div the correct styles', () => {
  render(<HiddenInput {...props} data-testid="test" />)

  const wrapper = screen.getByTestId('hidden-input-wrapper')

  expect(wrapper).toHaveStyle('visibility: hidden')
  expect(wrapper).toHaveStyle('left: -9999px')
  expect(wrapper).toHaveStyle('position: absolute')
})
