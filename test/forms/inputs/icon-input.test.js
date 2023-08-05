import React from 'react'
import { IconInput } from '../../../src/'
import { render, screen } from '@testing-library/react'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => { }
const props = { input: { name, value, onChange }, meta: {}, icon: 'foo' }

test('IconInput adds class "icon-label" to surrounding fieldset', () => {
  render(<IconInput {...props} />)
  const input = screen.getByRole('textbox')
  expect(input.parentElement?.parentElement).toHaveClass('icon-label')
})

test('IconInput renders <i> tag with correct class', () => {
  const { container } = render(<IconInput {...props} />)
  const icon = container.querySelector('i')
  expect(icon).toHaveClass('foo-icon')
})
