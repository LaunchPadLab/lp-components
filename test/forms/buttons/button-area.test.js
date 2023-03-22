import React from 'react'
import { shallow } from 'enzyme'
import { ButtonArea } from '../../../src/'
import { render, screen, fireEvent } from '@testing-library/react'

test('ButtonArea creates div with class "button-area"', () => {
  render(
    <ButtonArea>
      <button>Hi</button>
    </ButtonArea>
  )

  expect(screen.getByRole('button')).toBeInTheDocument()
  expect(screen.getByRole('button').closest('div')).toHaveClass('button-area')
})

test('ButtonArea merges classes correctly', () => {
  render(
    <ButtonArea>
      <button>Hi</button>
    </ButtonArea>
  )
  expect(screen.getByRole('button').closest('div')).toHaveClass('extra classes')
})
