import React from 'react'
import { HiddenInput } from '../../../src/'
import { render, screen } from '@testing-library/react'

const name = 'my.hidden.input'
const value = 'foo'
const onChange = jest.fn()
const props = { input: { name, value, onChange }, meta: {} }

test('HiddenInput renders an input', () => {
  render(<HiddenInput {...props} />)
  const input = screen.getByLabelText('Input')
  expect(input).toBeDefined()
})

test('HiddenInput renders a div the correct styles', () => {
  render(<HiddenInput {...props} data-testid="test" />)

  expect(screen.getByTestId('test')).parentElement?.parentElement?.parentElement?.toHaveStyle('visibility: hidden')
  expect(screen.getByTestId('test')).parentElement?.parentElement?.parentElement?.toHaveStyle('left: -9999px')
  expect(screen.getByTestId('test')).parentElement?.parentElement?.parentElement?.toHaveStyle('position: absolute')
})
