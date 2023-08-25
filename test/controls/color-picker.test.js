import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ColorPicker } from '../../src/'

test('ColorPicker toggles expanded when swatch is clicked', async () => {
  const user = userEvent.setup()
  render(<ColorPicker />)
  const swatchControl = screen.getByRole('button')

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  await user.click(swatchControl)
  expect(screen.queryByRole('dialog')).toBeInTheDocument()
  await user.click(swatchControl)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('ColorPicker can be externally controlled', () => {
  const { rerender } = render(<ColorPicker active={true} />)

  expect(screen.queryByRole('dialog')).toBeInTheDocument()
  rerender(<ColorPicker active={false} />)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
