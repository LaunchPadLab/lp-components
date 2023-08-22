import React from 'react'
import { IconInput } from '../../../src/'
import { render, screen } from '@testing-library/react'

const name = 'name.of.field'
const value = 'value of field'
const onChange = () => {}
const props = { input: { name, value, onChange }, meta: {}, icon: 'foo' }

test('IconInput adds class "icon-label" to surrounding fieldset', () => {
  render(<IconInput {...props} />)
  const fieldset = screen.getByRole('group')

  expect(fieldset).toHaveClass('icon-label')
})

test('IconInput renders <i> tag with correct class', () => {
  render(<IconInput {...props} />)
  const icon = screen.getByTestId('icon')

  expect(icon).toHaveClass('foo-icon')
})
