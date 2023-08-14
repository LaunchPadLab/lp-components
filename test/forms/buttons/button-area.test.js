import React from 'react'
import { ButtonArea } from '../../../src/'
import { render, screen } from '@testing-library/react'

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
    <ButtonArea className="extra classes">
      <button>Hi</button>
    </ButtonArea>
  )
  expect(screen.getByRole('button').closest('div')).toHaveClass(
    'button-area extra classes'
  )
})
